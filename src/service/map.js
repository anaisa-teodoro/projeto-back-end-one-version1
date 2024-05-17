const express = require('express');
const app = express();

// Middleware para analisar o corpo das requisições como JSON
app.use(express.json());

// Rota para lidar com requisições POST
app.post('/locais/maps', handlePostRequest);

// Constante para o URL base da API do OpenStreetMap
const OPENSTREETMAP_API_URL = 'https://nominatim.openstreetmap.org';

async function loadFetch() {
    return import('node-fetch').then(mod => mod.default);
}

module.exports = {
    // Função para obter o nome do local a partir de latitude e longitude
    async getLocalName(lat, lon) {
        const fetch = await loadFetch();
        try {
            const response = await fetch(`${OPENSTREETMAP_API_URL}/reverse?lat=${lat}&lon=${lon}&format=json`);
            const data = await response.json();
            return data.display_name;
        } catch (error) {
            console.error('Erro ao consultar o local:', error);
            throw new Error('Erro ao consultar o local');
        }
    }
}

// Função para buscar informações de endereço a partir de uma consulta
async function getAddressInfo(query) {
    const fetch = await loadFetch();
    try {
        const response = await fetch(`${OPENSTREETMAP_API_URL}/search?q=${query}&format=json`);
        const data = await response.json();

        // Log dos dados recebidos da API
        console.log('Dados recebidos da API do OpenStreetMap:', data);

        if (data.length > 0) {
            const result = data[1];
            const address = {
                cep: result.address.postcode || 'N/A',
                logradouro: result.address.road || 'N/A',
                numero: result.address.house_number || 'N/A',
                bairro: result.address.neighbourhood || 'N/A',
                cidade: result.address.city || 'N/A',
                estado: result.address.state || 'N/A'
            };
            return address;
        } else {
            throw new Error('Endereço não encontrado');
        }
    } catch (error) {
        console.error('Erro ao consultar a busca:', error);
        throw new Error('Erro ao consultar a busca');
    }
}

// Função para lidar com requisições POST que recebem endereço, latitude e longitude
async function handlePostRequest(req, res) {
    const { query, lat, lon } = req.body;
    try {
        let address;
        if (lat && lon) {
            address = await module.exports.getLocalName(lat, lon);
        } else if (query) {
            address = await getAddressInfo(query);
        } else {
            throw new Error('Informações insuficientes para a consulta');
        }
        res.json({ address });
    } catch (error) {
        console.error('Erro ao processar a solicitação:', error);
        res.status(500).json({ error: 'Erro ao processar a solicitação' });
    }
}
