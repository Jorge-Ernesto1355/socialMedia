import React from 'react';
import { Link } from 'react-router-dom';

export function HighlightedMentions({ text = "" }) {
  // Expresión regular que captura menciones (@username) y hashtags (#hashtag)
  const mentionAndHashtagRegex = /(@[a-zA-Z0-9_]+|#[a-zA-Z0-9_]+)/g;
  let matches;
  let highlightedText = text;

  // Encuentra todas las menciones y hashtags en el texto
  while ((matches = mentionAndHashtagRegex.exec(text)) !== null) {
    const match = matches[0];
    let replacement;

    if (match.startsWith('@')) {
       // Obtener el nombre de usuario sin el '@'
      replacement = `span style="color: #4098FF; cursor: pointer;">${match}</span>`;
    } else if (match.startsWith('#')) {
      
      replacement = `<span style="color: #4098FF; cursor: pointer;">${match}</span>`;
    }

    // Reemplazar la mención o el hashtag en el texto resaltado
    highlightedText = highlightedText.replace(match, replacement);
  }

  return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />;
}