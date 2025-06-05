import React from 'react';
import { usePage } from '@inertiajs/react';

export default function Show() {
  const { article } = usePage().props as any;

  return (
    <div>
      <h1>{article.title}</h1>
      <p><strong>Catégorie :</strong> {article.category?.name}</p>
      <p><strong>Auteur :</strong> {article.user?.name}</p>
      <div>{article.content}</div>
      <div>
        <strong>Tags :</strong>
        {article.tags.map((tag: any) => (
          <span key={tag.id} style={{ marginRight: 8 }}>{tag.name}</span>
        ))}
      </div>
    </div>
  );
}