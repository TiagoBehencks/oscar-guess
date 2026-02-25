"use client";

import { useState, useEffect } from "react";
import type { TmdbType } from "@/types/oscar";

const CACHE_PREFIX = "tmdb-img:";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 horas

interface CacheEntry {
  url: string | null;
  ts: number;
}

// Cache em memória para evitar leituras repetidas do localStorage na mesma sessão
const memoryCache = new Map<string, string | null>();

function readFromStorage(key: string): string | null | undefined {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return undefined;

    const entry: CacheEntry = JSON.parse(raw);

    if (Date.now() - entry.ts > CACHE_TTL_MS) {
      localStorage.removeItem(CACHE_PREFIX + key);

      return undefined;
    }

    return entry.url;
  } catch {
    return undefined;
  }
}

function writeToStorage(key: string, url: string | null) {
  try {
    const entry: CacheEntry = { url, ts: Date.now() };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
  } catch {
    // localStorage indisponível (modo privado com quota cheia, etc.)
  }
}

/**
 * Retorna a URL da imagem do TMDB para um nominee.
 * - undefined: ainda carregando
 * - null: não encontrado / sem API key
 * - string: URL da imagem
 *
 * Quando tmdbId é fornecido, busca diretamente pelo ID (resultado exato).
 * Caso contrário, faz busca por nome (fallback).
 * Cache em duas camadas: memória (sessão) + localStorage (24 h).
 */
export function useNomineeImage(
  name: string,
  tmdbType: TmdbType,
  tmdbId?: number,
) {
  const key = tmdbId ? `${tmdbType}:id:${tmdbId}` : `${tmdbType}:${name}`;

  const [imageUrl, setImageUrl] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    if (memoryCache.has(key)) {
      setImageUrl(memoryCache.get(key) ?? null);

      return;
    }

    const stored = readFromStorage(key);

    if (stored !== undefined) {
      memoryCache.set(key, stored);
      setImageUrl(stored);

      return;
    }

    const params = new URLSearchParams({ type: tmdbType });
    if (tmdbId) {
      params.set("id", String(tmdbId));
    } else {
      params.set("name", name);
    }

    fetch(`/api/tmdb-image?${params}`)
      .then((r) => r.json())
      .then(({ imageUrl: fetched }: { imageUrl: string | null }) => {
        const value = fetched ?? null;
        memoryCache.set(key, value);
        writeToStorage(key, value);
        setImageUrl(value);
      })
      .catch(() => {
        memoryCache.set(key, null);
        writeToStorage(key, null);
        setImageUrl(null);
      });
  }, [key, name, tmdbType, tmdbId]);

  return imageUrl;
}
