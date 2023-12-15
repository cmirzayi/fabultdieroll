// js/app.js
document.addEventListener('DOMContentLoaded', function () {
    const abilities = ['Dexterity', 'Insight', 'Might', 'Willpower'];

    function createAbilitiesSections() {
        const abilitiesSection = document.getElementById('abilitiesSection');

        abilities.forEach(ability => {
            const section = document.createElement('div');
            section.className = 'select-container';

            // Label
            const label = document.createElement('label');
            label.textContent = `${ability}:`;
            section.appendChild(label);

            // Dropdown
            const dieSelect = document.createElement('select');
            dieSelect.id = `${ability.toLowerCase()}Die`;
            for (let sides = 6; sides <= 12; sides += 2) {
                const option = document.createElement('option');
                option.value = `d${sides}`;
                option.textContent = `d${sides}`;
                dieSelect.appendChild(option);
            }
            section.appendChild(dieSelect);

            abilitiesSection.appendChild(section);
        });
    }

    function createCombinationButtons() {
        const combinationButtons = document.getElementById('combinationButtons');
        const combinationResults = document.getElementById('combinationResults');
        const combinations = getCombinationsWithSelf(abilities, 2);

        combinations.forEach(combination => {
            const button = document.createElement('button');
            button.textContent = `${combination[0]} + ${combination[1]}`;
            button.addEventListener('click', function () {
                const die1 = document.getElementById(`${combination[0].toLowerCase()}Die`).value;
                const die2 = document.getElementById(`${combination[1].toLowerCase()}Die`).value;
                const rollResult1 = rollDie(`d${parseInt(die1.slice(1))}`);
                const rollResult2 = rollDie(`d${parseInt(die2.slice(1))}`);
                const combinedResult = rollResult1 + rollResult2;
                updateResult(combinationResults, `${combination[0]} Roll: ${rollResult1}`, `${combination[1]} Roll: ${rollResult2}`, `Combined Total: ${combinedResult}`);
            });

            combinationButtons.appendChild(button);
        });
    }

    function rollDie(die) {
        const sides = parseInt(die.slice(1));
        return Math.floor(Math.random() * sides) + 1;
    }

    function getCombinationsWithSelf(arr, size) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            result.push([arr[i], arr[i]]); // Add combination with itself
            for (let j = 0; j < arr.length; j++) {
                if (i !== j) {
                    result.push([arr[i], arr[j]]);
                }
            }
        }

        return result;
    }

    function updateResult(resultsContainer, ...messages) {
        resultsContainer.innerHTML = ''; // Clear existing content
        messages.forEach(message => {
            const resultParagraph = document.createElement('p');
            resultParagraph.textContent = message;
            resultsContainer.appendChild(resultParagraph);
        });
    }

    createAbilitiesSections();
    createCombinationButtons();
});
