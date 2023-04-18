// Define the path where the JSON files are located
const jsonPath = 'namegen/';
const fileNames = ['dwarf_01.json', 'elf_01.json'];

// Load all the JSON files from the path
const loadJSONFiles = async () => {
  const fileData = await Promise.all(fileNames.map(async (fileName) => {
    const fileResponse = await fetch(`${jsonPath}${fileName}`);
    const fileJSON = await fileResponse.json();
    return fileJSON;
  }));
  return fileData;
}

// Define the function to generate a random name
const generateName = (raceData) => {
  const { prefixes, suffixes, singles } = raceData;
  const method = Math.floor(Math.random() * 2); // 0 for prefix-suffix, 1 for single
  if (method === 0) {
    const prefixIndex = Math.floor(Math.random() * prefixes.length);
    const suffixIndex = Math.floor(Math.random() * suffixes.length);
    return `${prefixes[prefixIndex]}${suffixes[suffixIndex]}`;
  } else {
    const singleIndex = Math.floor(Math.random() * singles.length);
    return singles[singleIndex];
  }
}

// Define the function to generate 20 random names and display them in rows
const generateNames = (raceData) => {
  const nameContainer = document.getElementById('name-container');
  nameContainer.innerHTML = ''; // Clear any existing names
  const numRows = 4;
  const numCols = 5;
  for (let row = 0; row < numRows; row++) {
    const nameRow = document.createElement('div');
    nameRow.classList.add('name-row');
    for (let col = 0; col < numCols; col++) {
      const nameCell = document.createElement('div');
      nameCell.classList.add('name-cell');
      nameCell.textContent = generateName(raceData);
      nameRow.appendChild(nameCell);
    }
    nameContainer.appendChild(nameRow);
  }
}

// Define the function to handle the generate button click
const handleGenerateClick = () => {
  const raceSelect = document.getElementById('race-select');
  const selectedRace = raceSelect.value;
  const selectedRaceData = races[selectedRace];
  generateNames(selectedRaceData);
}

// Load the JSON files and populate the races object with the data
const races = {};
loadJSONFiles().then((fileData) => {
  fileData.forEach((raceData, index) => {
    const fileName = fileNames[index].replace('.json', '');
    const raceName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
    races[raceName] = raceData;
    const raceOption = document.createElement('option');
    raceOption.value = raceName;
    raceOption.textContent = raceName;
    const raceSelect = document.getElementById('race-select');
    raceSelect.appendChild(raceOption);
  });
});

// Add an event listener to the generate button
const generateButton = document.getElementById('generate-button');
generateButton.addEventListener('click', handleGenerateClick);