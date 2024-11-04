document.getElementById('fetchButton').addEventListener('click', function() {
    const characterId = document.getElementById('characterId').value;
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    // Сбросим предыдущий результат и ошибки
    resultDiv.innerHTML = '';
    errorDiv.classList.add('hidden');

    if (characterId < 1 || characterId > 10) {
        errorDiv.innerHTML = 'ID должен быть от 1 до 10.';
        errorDiv.classList.remove('hidden');
        return;
    }

    loadingDiv.classList.remove('hidden');

    fetch(`https://swapi.py4e.com/people/${characterId}/`)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.status);
            }
            return response.json();
        })
        .then(data => {
            loadingDiv.classList.add('hidden');
            resultDiv.innerHTML = `Персонаж: ${data.name}<br>Рост: ${data.height} см<br>Вес: ${data.mass} кг<br>Цвет кожи: ${data.skin_color}<br>Цвет волос: ${data.hair_color}`;
        })
        .catch(error => {
            loadingDiv.classList.add('hidden');
            errorDiv.innerHTML = 'Произошла ошибка. Сервер не доступен или ID не найден.';
            errorDiv.classList.remove('hidden');
        })
        .finally(() => {
            loadingDiv.classList.add('hidden');
        });
});
