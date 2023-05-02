const {google} = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: 'avaliamuriae-9b6c4f9bb82a.json', // Arquivo de credenciais gerado no Google Cloud Console
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] // Escopos necessários para leitura de planilhas
});

async function buscarDadosPlanilha() {
    // Cria uma instância da API do Google Sheets
    const sheets = google.sheets({version: 'v4', auth});
    
    try {
        // Busca a planilha por ID
        const res = await sheets.spreadsheets.get({
            spreadsheetId: '1rew9Usnm3Kl2GnjzaKY0YaACqNO0IXbWrDmqGtUarMA'
        });

        // Busca a primeira aba da planilha
        const sheetName = res.data.sheets[0].properties.title;

        // Busca os valores da planilha
        const values = await sheets.spreadsheets.values.get({
            spreadsheetId: '1rew9Usnm3Kl2GnjzaKY0YaACqNO0IXbWrDmqGtUarMA',
            range: `${sheetName}!A2:C`, // Intervalo de células que contém os dados (neste exemplo, são três colunas)
        });

        // Retorna os valores encontrados
        return values.data.values;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function buscarValores() {
    try {
        const dados = await buscarDadosPlanilha();
        
        const escolas = [...new Set(dados.map(row => row[0]))];
        const anos = [...new Set(dados.map(row => row[1]))];
        const turmas = [...new Set(dados.map(row => row[2]))];
        
        return {escolas, anos, turmas};
    } catch (err) {
        console.error(err);
        return null;
    }
}

buscarValores().then(valores => {
    console.log(valores);
});
