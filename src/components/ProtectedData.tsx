// src/components/ProtectedData.tsx
import React, { useEffect, useState } from 'react';
import { fetchProtectedData } from '../services/api';

const ProtectedData: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchProtectedData();
                setData(result);
            } catch (err) {
                setError('Error al obtener datos protegidos');
            }
        };

        getData();
    }, []);

    return (
        <div>
            <h2>Datos Protegidos</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
};

export default ProtectedData;
