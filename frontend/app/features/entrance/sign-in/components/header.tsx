import React from 'react';

interface Props {
  name: string;
}

export function Header({ name }: Props) {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-2xl font-bold">{name}</h1>
      <p className="text-balance text-muted-foreground">Welcome back</p>
    </div>
  );
}
