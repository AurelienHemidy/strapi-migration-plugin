import React from 'react';
import { Badge, Typography } from '@strapi/design-system';

export interface MigrationsInfoTileProps {
  /**
   * Text of the tile
   */
  text: string;
  /**
   * Number of migrations
   */
  number: number;
  /**
   * Text color
   */
  textColor: string;
  /**
   * Is migrations (all migrations, succeed, failed) array empty
   */
  isMigrationsArrayEmpty: boolean;
}

export const MigrationsInfoTile = ({
  text,
  number,
  textColor,
  isMigrationsArrayEmpty,
}: MigrationsInfoTileProps) => {
  if (isMigrationsArrayEmpty) return null;

  return (
    <Badge>
      <Typography variant="sigma" textColor={textColor}>
        {number} {text}
      </Typography>
    </Badge>
  );
};
