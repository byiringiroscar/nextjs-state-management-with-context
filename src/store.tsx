import React, { useState, useMemo, createContext, useContext } from 'react';


interface Pokemon {
  id: number,
  name: string,
  image: string,
}

export const getServerSideProps = async() => {
  const resp = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json");
  const data = await resp.json();
  return {
    props: {
      pokemon: data
    }
  }
}

const usePokemonController = (pokemon: Pokemon[]) => {
    const [filter, setFilter] = useState("")
    const filteredPokemon = useMemo(
        () => pokemon.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase())),
        [ filter, pokemon ]
    );
    return { 
        filter, 
        setFilter, 
        pokemon: filteredPokemon 
    };
}


const PokemonContext = createContext<ReturnType<typeof usePokemonController>>({
    filter: "",
    setFilter: () => {},
    pokemon: []
    })

export const PokemonProvider: React.FC<{ pokemon: Pokemon[]; children: React.ReactNode }> = (
  { pokemon, children }
) => (
  <PokemonContext.Provider value={usePokemonController(pokemon)}>
    {children}
  </PokemonContext.Provider>
);
    

export const usePokemon = () => useContext(PokemonContext);