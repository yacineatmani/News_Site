import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function Create() {
  const { data, setData, post, errors } = useForm({ name: '' });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    post(route('categories.store'));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Créer une catégorie</h1>
      <input
        type="text"
        value={data.name}
        onChange={e => setData('name', e.target.value)}
        placeholder="Nom"
      />
      {errors.name && <div>{errors.name}</div>}
      <button type="submit">Créer</button>
    </form>
  );
}