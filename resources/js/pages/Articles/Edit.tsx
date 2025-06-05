import React from 'react';
import { useForm, usePage } from '@inertiajs/react';

type Article = {
  id: number;
  title: string;
  content: string;
  category_id: number | string;
  tags: { id: number; name: string }[];
};

type Category = { id: number; name: string };
type Tag = { id: number; name: string };

type PageProps = {
  article: Article;
  categories: Category[];
  tags: Tag[];
};

export default function Edit() {
  const { article, categories, tags } = usePage<PageProps>().props;

  const { data, setData, put, errors } = useForm({
    title: article.title || '',
    content: article.content || '',
    category_id: article.category_id || '',
    tags: article.tags ? article.tags.map((t: any) => t.id) : [],
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    put(route('articles.update', article.id));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Modifier un article</h1>
      <input
        type="text"
        value={data.title}
        onChange={e => setData('title', e.target.value)}
        placeholder="Titre"
      />
      {errors.title && <div>{errors.title}</div>}

      <textarea
        value={data.content}
        onChange={e => setData('content', e.target.value)}
        placeholder="Contenu"
      />
      {errors.content && <div>{errors.content}</div>}

      <select value={data.category_id} onChange={e => setData('category_id', e.target.value)}>
        <option value="">Choisir une catégorie</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
      {errors.category_id && <div>{errors.category_id}</div>}

      <div>
        <label>Tags :</label>
        {tags.map(tag => (
          <label key={tag.id}>
            <input
              type="checkbox"
              value={tag.id}
              checked={data.tags.includes(tag.id)}
              onChange={e => {
                if (e.target.checked) {
                  setData('tags', [...data.tags, tag.id]);
                } else {
                  setData('tags', data.tags.filter((id: number) => id !== tag.id));
                }
              }}
            />
            {tag.name}
          </label>
        ))}
      </div>

      <button type="submit">Enregistrer</button>
    </form>
  );
}