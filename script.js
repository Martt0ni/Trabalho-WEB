// Aguarda o DOM estar completamente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os elementos do HTML com os quais vamos interagir
    const itemInput = document.getElementById('item-input');
    const addBtn = document.getElementById('add-btn');
    const shoppingList = document.getElementById('shopping-list');

    // Carrega os itens salvos no localStorage ao iniciar
    loadItems();

    // Adiciona um "ouvinte de eventos" para o clique no botão "Adicionar"
    addBtn.addEventListener('click', addItem);

    // Permite adicionar item ao pressionar a tecla "Enter"
    itemInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addItem();
        }
    });

    function addItem() {
        const itemText = itemInput.value.trim(); // Pega o texto e remove espaços em branco

        if (itemText === '') {
            alert('Por favor, digite um item.');
            return; // Impede que itens vazios sejam adicionados
        }

        createListItem(itemText); // Cria o elemento na lista
        saveItems(); // Salva a lista no localStorage

        itemInput.value = ''; // Limpa o campo de entrada
        itemInput.focus(); // Coloca o cursor de volta no campo de entrada
    }

    function createListItem(text, isComprado = false) {
        // Cria um novo elemento <li> (item da lista)
        const li = document.createElement('li');
        li.className = 'list-item';

        // Adiciona a classe 'comprado' se o item já estiver marcado
        if (isComprado) {
            li.classList.add('comprado');
        }
        
        // Cria o texto do item
        const itemTextSpan = document.createElement('span');
        itemTextSpan.className = 'item-text';
        itemTextSpan.textContent = text;
        
        // Adiciona evento de clique para marcar/desmarcar como comprado
        li.addEventListener('click', () => {
            li.classList.toggle('comprado');
            saveItems(); // Salva a alteração
        });

        // Cria o botão de remover
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'Remover';
        
        removeBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Impede que o clique no botão marque o item
            li.remove(); // Remove o item da lista
            saveItems(); // Salva a alteração
        });
        
        // Adiciona o texto e o botão ao item da lista (<li>)
        li.appendChild(itemTextSpan);
        li.appendChild(removeBtn);
        
        // Adiciona o item da lista (<li>) à lista principal (<ul>)
        shoppingList.appendChild(li);
    }

    // --- Funcionalidade Opcional: Local Storage ---

    function saveItems() {
        const items = [];
        // Percorre todos os itens da lista
        document.querySelectorAll('.list-item').forEach(item => {
            items.push({
                text: item.querySelector('.item-text').textContent,
                comprado: item.classList.contains('comprado')
            });
        });
        // Salva o array de itens no localStorage como uma string JSON
        localStorage.setItem('shoppingListItems', JSON.stringify(items));
    }

    function loadItems() {
        // Pega os itens salvos do localStorage
        const savedItems = localStorage.getItem('shoppingListItems');
        if (savedItems) {
            // Converte a string JSON de volta para um array de objetos
            const items = JSON.parse(savedItems);
            items.forEach(item => {
                createListItem(item.text, item.comprado);
            });
        }
    }
});
