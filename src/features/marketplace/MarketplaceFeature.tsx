import React, { useState } from 'react';
import { ShoppingBag, Plus, Check } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface Listing {
  id: string;
  name: string;
  price: string;
  tag: string;
  owner: string;
  postedAt: string;
}

const INITIAL_LISTINGS: Listing[] = [
  { id: 'l1', name: 'Raqueta Babolat Pure Drive', price: '$95.000', tag: 'Tenis', owner: 'Juan P.', postedAt: 'Hace 2 días' },
  { id: 'l2', name: 'Zapatillas Nike Court', price: '$42.000', tag: 'Tenis · Talla 42', owner: 'María G.', postedAt: 'Hace 1 día' },
  { id: 'l3', name: 'Bicicleta Trek MTB', price: '$320.000', tag: 'Ciclismo', owner: 'Carlos R.', postedAt: 'Hace 5 horas' },
  { id: 'l4', name: 'Patines Rollerblade', price: '$68.000', tag: 'Patinaje', owner: 'Ana L.', postedAt: 'Hace 12 horas' },
];

export const MarketplaceFeature: React.FC = () => {
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formTag, setFormTag] = useState('');

  const handlePost = () => {
    if (!formName || !formPrice) return;
    const newItem: Listing = {
      id: `l-${Date.now()}`,
      name: formName,
      price: formPrice,
      tag: formTag || 'General',
      owner: 'Tú',
      postedAt: 'Ahora',
    };
    setListings([newItem, ...listings]);
    setFormName('');
    setFormPrice('');
    setFormTag('');
    setShowForm(false);
  };

  return (
    <section className="product-page space-y-5">
      <header className="product-welcome">
        <p className="product-eyebrow">Marketplace</p>
        <h1>Equipamiento deportivo</h1>
        <p className="text-sm text-slate-500">Compra y vende entre deportistas de la comunidad.</p>
      </header>

      {/* Post button */}
      <div className="flex justify-end">
        <Button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2">
          <Plus className="h-4 w-4" /> Publicar equipo
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm ring-1 ring-slate-200 space-y-3">
          <h3 className="font-bold text-slate-900">Nuevo aviso</h3>
          <Input label="Nombre del artículo" value={formName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormName(e.target.value)} placeholder="Ej. Raqueta Babolat" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Precio" value={formPrice} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormPrice(e.target.value)} placeholder="Ej. $50.000" />
            <Input label="Categoría / Deporte" value={formTag} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormTag(e.target.value)} placeholder="Ej. Tenis" />
          </div>
          <div className="flex gap-2 pt-2">
            <Button onClick={() => { setFormName(''); setFormPrice(''); setFormTag(''); setShowForm(false); }}>Cancelar</Button>
            <Button variant="primary" onClick={handlePost} disabled={!formName || !formPrice}>Publicar</Button>
          </div>
        </div>
      )}

      {/* Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {listings.map((item) => (
          <article key={item.id} className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm hover:shadow-md transition ring-1 ring-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <span className="grid place-items-center h-10 w-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600"><ShoppingBag className="h-5 w-5" /></span>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-slate-900 truncate">{item.name}</h3>
                <span className="text-xs text-slate-400">Por {item.owner} · {item.postedAt}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-500">{item.tag}</span>
              <strong className="text-blue-600 font-extrabold text-sm">{item.price}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
