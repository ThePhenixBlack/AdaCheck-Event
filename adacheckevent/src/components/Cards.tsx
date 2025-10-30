import { useEffect, useState } from "react";

export default function Cards() {
  interface Print {
    title: string;
    lead_text: string;
    cover_url: string;
    adresse_street: string;
    adress_zipcode: number;
    adress_city: string;
    price_detail: string;
    audience: string;

  }
  
  const [Print, setPrint] = useState<Print[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch('https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20');
      const data = await res.json();
      
      // ✅ Créer tous les objets en une seule fois
      const nouveauxElements = data.results.map((result: any) => ({
        title: result.title || '',
        lead_text: result.lead_text || '',
        cover_url: result.cover_url || '',
        adresse_street: result.address_street || 'Non renseigné.',
        adress_zipcode: result.address_zipcode || '',
        adress_city: result.address_city || '',
        audience: result.audience || '',
        price_detail: result.price_detail || 'N/A.'
      }));
      
      setPrint(nouveauxElements);
    };
    
    loadData();
  }, []);

  if (Print.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h1>Événements à Paris</h1>
        <ul>
          {Print.map((item, index) => (
            <li key={index}>
              <h2>{item.title}</h2>
              <p>{item.lead_text}</p>
              <img src={item.cover_url} ></img>
              <p>Adresse : {item.adresse_street} <br></br>{item.adress_zipcode} {item.adress_city} </p>
              <p>Audience : {item.audience}</p>
              <p>Prix :{item.price_detail} </p>
              {/* Ajoute d'autres propriétés si besoin */}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}