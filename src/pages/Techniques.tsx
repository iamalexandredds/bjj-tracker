import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BookOpen, Search } from 'lucide-react';
import { useState } from 'react';

// Dati inseriti direttamente per evitare errori di file mancanti
const TECHNIQUE_CATEGORIES = [
  { value: "guard", label: "Guardia", description: "Lavora dalla schiena: chiusa, aperta, spider e altro." },
  { value: "passing", label: "Passaggi", description: "Supera le gambe dell'avversario e stabilizza." },
  { value: "submissions", label: "Sottomissioni", description: "Finalizzazioni: leve articolari e strozzamenti." },
  { value: "takedowns", label: "Proiezioni", description: "Porta il combattimento a terra." },
  { value: "escapes", label: "Uscite", description: "Libarati dalle posizioni di svantaggio." },
  { value: "back-takes", label: "Prese di schiena", description: "Raggiungi la posizione dominante suprema." },
];

export default function Techniques() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = TECHNIQUE_CATEGORIES.filter(cat => 
    cat.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display">Libreria Tecniche</h1>
        <p className="text-muted-foreground mt-1">Esplora le categorie fondamentali del BJJ.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          className="w-full bg-card border border-border rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          placeholder="Cerca per nome o descrizione..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category) => (
          <Card key={category.value} className="hover:border-primary transition-all cursor-pointer group bg-card shadow-sm hover:shadow-glow">
            <CardHeader className="flex flex-row items-center space-x-3 pb-2">
              <BookOpen className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              <CardTitle className="text-lg font-bold">{category.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-snug">
                {category.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
