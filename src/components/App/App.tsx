import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import WeaponCard from '../Cards/WeaponCard'; // Компонент для отображения одной карточки
import '../Cards/WeaponCard.css'; 

// Определяем интерфейс для данных об оружии
interface Weapon {
  id: number;
  name: string;
  category: string;
  description: string;
  photoUrl: string;
  dateAdded: string;
  dateEdit: string;
  visible: boolean;
}

const App: React.FC = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]); // Список оружия
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Ошибка как строка или null

  const fetchWeapons = useCallback(async () => {
    setLoading(true);
    try {
      if (!process.env.REACT_APP_API_URL) {
        throw new Error("REACT_APP_API_URL не установлен в .env файле");
      }
      
      const response = await axios.get("https://cardclient20241120225638.azurewebsites.net/api/Cards");
      setWeapons(response.data);
    } catch (err) {
      console.error("Error fetching data:", error);
      setError("Ошибка при загрузке данных");
    } finally {
      setLoading(false);
    }
  }, [error]);

  useEffect(() => {
    fetchWeapons();
  }, [fetchWeapons]);

  const handleEdit = (weapon: Weapon) => {
    // Логика редактирования карточки
    console.log("Редактировать:", weapon);
  };

  const handleDelete = (weaponId: number) => {
    // Логика удаления карточки
    setWeapons(weapons.filter((w) => w.id !== weaponId));
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <div>
      <h1>Weapon Cards</h1>

      <div className="weapon-cards-container">
        {/* Отображение всех карточек оружия */}
        {weapons.length > 0 ? (
          weapons.map((weapon) => (
            <WeaponCard
              key={weapon.id}
              weapon={weapon}
              onEdit={() => handleEdit(weapon)}
              onDelete={() => handleDelete(weapon.id)}
            />
          ))
        ) : (
          <div>Карточки оружия не найдены.</div>
        )}
      </div>
    </div>
  );
};

export default App;