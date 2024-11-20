import React from 'react';
import './WeaponCard.css';

interface WeaponCardProps {
  weapon: {
    id: number;
    name: string;
    category: string;
    description: string;
    photoUrl: string;
    dateAdded: string;
    dateEdit: string;
    visible: boolean;
  };
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const WeaponCard: React.FC<WeaponCardProps> = ({ weapon, onEdit, onDelete }) => {
  return (
    <div className="weapon-card">
      <img src={weapon.photoUrl} alt={weapon.name} className="weapon-card-image" />
      <h2>{weapon.name}</h2>
      <p><strong>Категория:</strong> {weapon.category}</p>
      <p>{weapon.description}</p>
      <p><small>Добавлено: {new Date(weapon.dateAdded).toLocaleDateString()}</small></p>
      <p><small>Редактировано: {new Date(weapon.dateEdit).toLocaleDateString()}</small></p>
      <p><strong>Видимость:</strong> {weapon.visible ? "Да" : "Нет"}</p>
      {/* <button onClick={() => onEdit(weapon.id)}>Редактировать</button>
      <button onClick={() => onDelete(weapon.id)}>Удалить</button> */}
    </div>
  );
};

export default WeaponCard;