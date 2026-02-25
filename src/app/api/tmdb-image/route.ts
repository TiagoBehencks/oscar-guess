import { NextRequest, NextResponse } from "next/server";

const TMDB_BASE = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w342";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as "movie" | "person" | null;
  const tmdbId = searchParams.get("id");
  const name = searchParams.get("name");

  if (!type || (!tmdbId && !name)) {
    return NextResponse.json({ imageUrl: null }, { status: 400 });
  }

  const apiToken = process.env.TMDB_API_KEY;
  if (!apiToken) {
    return NextResponse.json({ imageUrl: null });
  }

  try {
    let path: string | null = null;

    if (tmdbId) {
      // Fetch diretamente pelo ID numérico — resultado exato
      const endpoint =
        type === "movie"
          ? `${TMDB_BASE}/movie/${tmdbId}?language=en-US`
          : `${TMDB_BASE}/person/${tmdbId}?language=en-US`;

      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${apiToken}` },
        next: { revalidate: 86400 },
      });

      if (!res.ok) return NextResponse.json({ imageUrl: null });

      const data = await res.json();
      path = type === "movie" ? data.poster_path : data.profile_path;
    } else {
      // Fallback: busca por nome
      const query = encodeURIComponent(name!);
      const searchUrl =
        type === "movie"
          ? `${TMDB_BASE}/search/movie?query=${query}&year=2024&language=en-US`
          : `${TMDB_BASE}/search/person?query=${query}&language=en-US`;

      const res = await fetch(searchUrl, {
        headers: { Authorization: `Bearer ${apiToken}` },
        next: { revalidate: 86400 },
      });

      if (!res.ok) return NextResponse.json({ imageUrl: null });

      const data = await res.json();
      const first = data.results?.[0];
      if (!first) return NextResponse.json({ imageUrl: null });
      path = type === "movie" ? first.poster_path : first.profile_path;
    }

    if (!path) return NextResponse.json({ imageUrl: null });

    return NextResponse.json(
      { imageUrl: `${IMAGE_BASE}${path}` },
      { headers: { "Cache-Control": "public, max-age=86400" } },
    );
  } catch {
    return NextResponse.json({ imageUrl: null });
  }
}
