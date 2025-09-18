const nflTeams = [
    'Cardinals', 'Falcons', 'Ravens', 'Bills', 'Panthers', 'Bears', 'Bengals', 'Browns',
    'Cowboys', 'Broncos', 'Lions', 'Packers', 'Texans', 'Colts', 'Jaguars', 'Chiefs',
    'Raiders', 'Chargers', 'Rams', 'Dolphins', 'Vikings', 'Patriots', 'Saints', 'Giants',
    'Jets', 'Eagles', 'Steelers', '49ers', 'Seahawks', 'Buccaneers', 'Titans', 'Commanders'
];

// NFL team abbreviations mapping
const teamAbbreviations = {
    'Cardinals': 'ARI',
    'Falcons': 'ATL',
    'Ravens': 'BAL',
    'Bills': 'BUF',
    'Panthers': 'CAR',
    'Bears': 'CHI',
    'Bengals': 'CIN',
    'Browns': 'CLE',
    'Cowboys': 'DAL',
    'Broncos': 'DEN',
    'Lions': 'DET',
    'Packers': 'GB',
    'Texans': 'HOU',
    'Colts': 'IND',
    'Jaguars': 'JAX',
    'Chiefs': 'KC',
    'Raiders': 'LV',
    'Chargers': 'LAC',
    'Rams': 'LAR',
    'Dolphins': 'MIA',
    'Vikings': 'MIN',
    'Patriots': 'NE',
    'Saints': 'NO',
    'Giants': 'NYG',
    'Jets': 'NYJ',
    'Eagles': 'PHI',
    'Steelers': 'PIT',
    '49ers': 'SF',
    'Seahawks': 'SEA',
    'Buccaneers': 'TB',
    'Titans': 'TEN',
    'Commanders': 'WAS'
};

// Team data: {teamName: {high: 0-100, avg: 0-100, low: 0-100, inChart: boolean}}
let teamData = {};
let draggedTeam = null;
let isDraggingHandle = false;
let currentHandle = null;
let activeTeam = null; // Track which team is currently highlighted

// Initialize team data
function initializeTeamData() {
    nflTeams.forEach(team => {
        teamData[team] = {
            high: 50,
            avg: 50,
            low: 50,
            inChart: false
        };
    });
}

// Create team element for the pool
function createTeamElement(teamName) {
    const teamDiv = document.createElement('div');
    teamDiv.className = 'team';
    teamDiv.draggable = true;
    teamDiv.setAttribute('data-team', teamName);
    
    const logoDiv = document.createElement('div');
    logoDiv.className = 'team-logo';
    logoDiv.textContent = teamAbbreviations[teamName] || teamName.substring(0, 3).toUpperCase();
    
    const nameDiv = document.createElement('div');
    nameDiv.className = 'team-name';
    nameDiv.textContent = teamName;
    
    teamDiv.appendChild(logoDiv);
    teamDiv.appendChild(nameDiv);
    
    // Add drag event listeners
    teamDiv.addEventListener('dragstart', handleTeamDragStart);
    teamDiv.addEventListener('dragend', handleTeamDragEnd);
    
    return teamDiv;
}

// Create team range element for the chart
function createTeamRangeElement(teamName) {
    const teamDiv = document.createElement('div');
    teamDiv.className = 'team-range';
    teamDiv.setAttribute('data-team', teamName);
    
    // Team info at bottom
    const infoDiv = document.createElement('div');
    infoDiv.className = 'team-info';
    
    const logoDiv = document.createElement('div');
    logoDiv.className = 'team-logo-small';
    logoDiv.textContent = teamAbbreviations[teamName] || teamName.substring(0, 3).toUpperCase();
    
    const nameDiv = document.createElement('div');
    nameDiv.className = 'team-name-small';
    nameDiv.textContent = teamName;
    
    infoDiv.appendChild(logoDiv);
    infoDiv.appendChild(nameDiv);
    
    // Range bar
    const rangeBar = document.createElement('div');
    rangeBar.className = 'range-bar';
    
    // Range handles
    const highHandle = document.createElement('div');
    highHandle.className = 'range-handle high';
    highHandle.setAttribute('data-type', 'high');
    
    const avgHandle = document.createElement('div');
    avgHandle.className = 'range-handle avg';
    avgHandle.setAttribute('data-type', 'avg');
    
    const lowHandle = document.createElement('div');
    lowHandle.className = 'range-handle low';
    lowHandle.setAttribute('data-type', 'low');
    
    teamDiv.appendChild(rangeBar);
    teamDiv.appendChild(highHandle);
    teamDiv.appendChild(avgHandle);
    teamDiv.appendChild(lowHandle);
    teamDiv.appendChild(infoDiv);
    
    // Add mouse event listeners for handles
    [highHandle, avgHandle, lowHandle].forEach(handle => {
        handle.addEventListener('mousedown', startHandleDrag);
    });
    
    // Add double-click to remove from chart
    teamDiv.addEventListener('dblclick', function() {
        removeTeamFromChart(teamName);
    });
    
    updateTeamRangePosition(teamName);
    return teamDiv;
}

// Team drag and drop functions
function handleTeamDragStart(e) {
    draggedTeam = this.getAttribute('data-team');
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleTeamDragEnd(e) {
    this.classList.remove('dragging');
    draggedTeam = null;
}

// Chart area drag and drop
function setupChartDropZone() {
    const chartArea = document.getElementById('chart-area');
    const chartContainer = document.querySelector('.chart-container');
    
    chartArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        chartContainer.classList.add('drag-over');
    });
    
    chartArea.addEventListener('dragleave', function(e) {
        chartContainer.classList.remove('drag-over');
    });
    
    chartArea.addEventListener('drop', function(e) {
        e.preventDefault();
        chartContainer.classList.remove('drag-over');
        if (draggedTeam && !teamData[draggedTeam].inChart) {
            addTeamToChart(draggedTeam);
        }
    });
}

// Set active team and update visual highlighting
function setActiveTeam(teamName) {
    // Remove active class from all teams
    document.querySelectorAll('.team-range').forEach(element => {
        element.classList.remove('active');
    });
    
    // Set new active team
    activeTeam = teamName;
    if (teamName) {
        const teamElement = document.querySelector(`.team-range[data-team="${teamName}"]`);
        if (teamElement) {
            teamElement.classList.add('active');
        }
    }
}

// Add team to chart
function addTeamToChart(teamName) {
    if (teamData[teamName].inChart) return;
    
    teamData[teamName].inChart = true;
    
    // Remove from pool
    const poolTeam = document.querySelector(`.teams-container .team[data-team="${teamName}"]`);
    if (poolTeam) {
        poolTeam.remove();
    }
    
    // Add to chart
    const chartContainer = document.getElementById('teams-ranges');
    const teamRangeElement = createTeamRangeElement(teamName);
    chartContainer.appendChild(teamRangeElement);
    
    // Set as active team when first added
    setActiveTeam(teamName);
    
    sortTeamsByAverage();
    saveData();
}

// Remove team from chart
function removeTeamFromChart(teamName) {
    if (!teamData[teamName].inChart) return;
    
    teamData[teamName].inChart = false;
    
    // Remove from chart
    const chartTeam = document.querySelector(`.teams-ranges .team-range[data-team="${teamName}"]`);
    if (chartTeam) {
        chartTeam.remove();
    }
    
    // Add back to pool
    const poolContainer = document.getElementById('teams-container');
    const teamElement = createTeamElement(teamName);
    poolContainer.appendChild(teamElement);
    
    saveData();
}

// Handle drag functions
function startHandleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
    
    isDraggingHandle = true;
    currentHandle = {
        element: e.target,
        teamName: e.target.closest('.team-range').getAttribute('data-team'),
        type: e.target.getAttribute('data-type')
    };
    
    // Set this team as active when any handle is clicked
    setActiveTeam(currentHandle.teamName);
    
    document.addEventListener('mousemove', handleHandleDrag);
    document.addEventListener('mouseup', endHandleDrag);
    
    e.target.style.cursor = 'grabbing';
}

function handleHandleDrag(e) {
    if (!isDraggingHandle || !currentHandle) return;
    
    const chartArea = document.querySelector('.chart-area');
    const rect = chartArea.getBoundingClientRect();
    const chartHeight = rect.height - 60; // Account for team info space
    
    // Calculate position (0-100, inverted because chart goes top to bottom)
    const relativeY = e.clientY - rect.top;
    const percentage = Math.max(0, Math.min(100, 100 - (relativeY / chartHeight * 100)));
    
    const teamName = currentHandle.teamName;
    const handleType = currentHandle.type;
    
    // Update team data
    teamData[teamName][handleType] = Math.round(percentage);
    
    // Enforce logical constraints
    const data = teamData[teamName];
    if (handleType === 'high') {
        data.avg = Math.min(data.avg, data.high);
        data.low = Math.min(data.low, data.avg);
    } else if (handleType === 'avg') {
        data.high = Math.max(data.high, data.avg);
        data.low = Math.min(data.low, data.avg);
    } else if (handleType === 'low') {
        data.avg = Math.max(data.avg, data.low);
        data.high = Math.max(data.high, data.avg);
    }
    
    updateTeamRangePosition(teamName);
    // Only sort if NOT dragging the average handle
    if (handleType !== 'avg') {
        sortTeamsByAverage();
    }
    saveData();
}

function endHandleDrag(e) {
    isDraggingHandle = false;
    
    // If we were dragging the average handle, sort now
    if (currentHandle && currentHandle.type === 'avg') {
        sortTeamsByAverage();
    }
    
    if (currentHandle) {
        currentHandle.element.style.cursor = 'grab';
        currentHandle = null;
    }
    
    document.removeEventListener('mousemove', handleHandleDrag);
    document.removeEventListener('mouseup', endHandleDrag);
}

// Update team range visual position
function updateTeamRangePosition(teamName) {
    const teamElement = document.querySelector(`.team-range[data-team="${teamName}"]`);
    if (!teamElement) return;
    
    const data = teamData[teamName];
    const chartHeight = document.querySelector('.chart-area').offsetHeight - 60;
    
    // Calculate positions (inverted: 100% = top, 0% = bottom)
    const highPos = (100 - data.high) * chartHeight / 100;
    const avgPos = (100 - data.avg) * chartHeight / 100;
    const lowPos = (100 - data.low) * chartHeight / 100;
    
    // Update range bar
    const rangeBar = teamElement.querySelector('.range-bar');
    rangeBar.style.top = `${highPos}px`;
    rangeBar.style.height = `${Math.max(2, lowPos - highPos)}px`;
    
    // Update handles
    teamElement.querySelector('.range-handle.high').style.top = `${highPos}px`;
    teamElement.querySelector('.range-handle.avg').style.top = `${avgPos}px`;
    teamElement.querySelector('.range-handle.low').style.top = `${lowPos}px`;
}

// Sort teams by average ranking (highest to lowest, left to right)
function sortTeamsByAverage() {
    const container = document.getElementById('teams-ranges');
    const teamElements = Array.from(container.children);
    
    // Sort by average (descending)
    teamElements.sort((a, b) => {
        const teamA = a.getAttribute('data-team');
        const teamB = b.getAttribute('data-team');
        return teamData[teamB].avg - teamData[teamA].avg;
    });
    
    // Re-append in sorted order and maintain active state
    teamElements.forEach(element => {
        container.appendChild(element);
        // Restore active class if this was the active team
        const teamName = element.getAttribute('data-team');
        if (teamName === activeTeam) {
            element.classList.add('active');
        }
    });
}

// Populate teams pool
function populateTeamsPool() {
    const container = document.getElementById('teams-container');
    container.innerHTML = '';
    
    nflTeams.forEach(team => {
        if (!teamData[team].inChart) {
            const teamElement = createTeamElement(team);
            container.appendChild(teamElement);
        }
    });
}

// Reset all rankings
function resetRankings() {
    // Clear chart
    document.getElementById('teams-ranges').innerHTML = '';
    
    // Reset data and active team
    initializeTeamData();
    activeTeam = null;
    
    // Repopulate pool
    populateTeamsPool();
    
    saveData();
}

// Save/Load data
function saveData() {
    localStorage.setItem('nflRangeData', JSON.stringify(teamData));
}

function loadData() {
    const saved = localStorage.getItem('nflRangeData');
    if (saved) {
        teamData = JSON.parse(saved);
    } else {
        initializeTeamData();
    }
    
    // Reset active team on load
    activeTeam = null;
    
    // Populate chart with teams that are in chart
    const chartContainer = document.getElementById('teams-ranges');
    chartContainer.innerHTML = '';
    
    Object.keys(teamData).forEach(teamName => {
        if (teamData[teamName].inChart) {
            const teamRangeElement = createTeamRangeElement(teamName);
            chartContainer.appendChild(teamRangeElement);
        }
    });
    
    sortTeamsByAverage();
    populateTeamsPool();
}

// Handle window resize
function handleResize() {
    Object.keys(teamData).forEach(teamName => {
        if (teamData[teamName].inChart) {
            setTimeout(() => updateTeamRangePosition(teamName), 100);
        }
    });
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupChartDropZone();
    
    // Event listeners
    document.getElementById('reset-btn').addEventListener('click', resetRankings);
    window.addEventListener('resize', handleResize);
    
    // View toggle placeholder
    document.getElementById('view-toggle').addEventListener('click', function() {
        alert('Tier view coming soon!');
    });
});