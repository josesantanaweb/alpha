"use client";
import { useEffect } from "react";
import { initialize } from "@/lib/api/auth";

export function AuthInitializer() {
  useEffect(() => {
    initialize();
  }, []);

  return null;
}