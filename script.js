const nflTeams = [
    'Cardinals', 'Falcons', 'Ravens', 'Bills', 'Panthers', 'Bears', 'Bengals', 'Browns',
    'Cowboys', 'Broncos', 'Lions', 'Packers', 'Texans', 'Colts', 'Jaguars', 'Chiefs',
    'Raiders', 'Chargers', 'Rams', 'Dolphins', 'Vikings', 'Patriots', 'Saints', 'Giants',
    'Jets', 'Eagles', 'Steelers', '49ers', 'Seahawks', 'Buccaneers', 'Titans', 'Commanders'
];

// NFL team data with abbreviations and logo URLs
const teamData_static = {
    'Cardinals': { abbr: 'ARI', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/ari.png' },
    'Falcons': { abbr: 'ATL', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/atl.png' },
    'Ravens': { abbr: 'BAL', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/bal.png' },
    'Bills': { abbr: 'BUF', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/buf.png' },
    'Panthers': { abbr: 'CAR', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/car.png' },
    'Bears': { abbr: 'CHI', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/chi.png' },
    'Bengals': { abbr: 'CIN', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/cin.png' },
    'Browns': { abbr: 'CLE', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/cle.png' },
    'Cowboys': { abbr: 'DAL', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/dal.png' },
    'Broncos': { abbr: 'DEN', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/den.png' },
    'Lions': { abbr: 'DET', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/det.png' },
    'Packers': { abbr: 'GB', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/gb.png' },
    'Texans': { abbr: 'HOU', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/hou.png' },
    'Colts': { abbr: 'IND', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/ind.png' },
    'Jaguars': { abbr: 'JAX', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/jax.png' },
    'Chiefs': { abbr: 'KC', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/kc.png' },
    'Raiders': { abbr: 'LV', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/lv.png' },
    'Chargers': { abbr: 'LAC', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/lac.png' },
    'Rams': { abbr: 'LAR', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/lar.png' },
    'Dolphins': { abbr: 'MIA', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/mia.png' },
    'Vikings': { abbr: 'MIN', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/min.png' },
    'Patriots': { abbr: 'NE', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/ne.png' },
    'Saints': { abbr: 'NO', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/no.png' },
    'Giants': { abbr: 'NYG', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/nyg.png' },
    'Jets': { abbr: 'NYJ', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/nyj.png' },
    'Eagles': { abbr: 'PHI', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/phi.png' },
    'Steelers': { abbr: 'PIT', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/pit.png' },
    '49ers': { abbr: 'SF', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/sf.png' },
    'Seahawks': { abbr: 'SEA', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/sea.png' },
    'Buccaneers': { abbr: 'TB', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/tb.png' },
    'Titans': { abbr: 'TEN', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/ten.png' },
    'Commanders': { abbr: 'WAS', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/wsh.png' }
};

// Legacy abbreviation mapping for backward compatibility
const teamAbbreviations = Object.fromEntries(
    Object.entries(teamData_static).map(([team, data]) => [team, data.abbr])
);

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
            high: 8,
            avg: 16,
            low: 24,
            inChart: false
        };
    });
}

// Create team element for the pool
function createTeamElement(teamName) {
    const teamDiv = document.createElement('div');
    teamDiv.className = 'team clickable-team';
    teamDiv.setAttribute('data-team', teamName);
    
    const logoDiv = document.createElement('div');
    logoDiv.className = 'team-logo';
    
    // Create logo image
    const logoImg = document.createElement('img');
    logoImg.src = teamData_static[teamName]?.logo || '';
    logoImg.alt = teamAbbreviations[teamName] || teamName.substring(0, 3).toUpperCase();
    logoImg.className = 'team-logo-img';
    
    // Fallback text if image fails to load
    logoImg.onerror = function() {
        logoDiv.innerHTML = teamAbbreviations[teamName] || teamName.substring(0, 3).toUpperCase();
        logoDiv.classList.add('text-fallback');
    };
    
    logoDiv.appendChild(logoImg);
    
    const nameDiv = document.createElement('div');
    nameDiv.className = 'team-name';
    nameDiv.textContent = teamName;
    
    teamDiv.appendChild(logoDiv);
    teamDiv.appendChild(nameDiv);
    
    // Add click event listener instead of drag
    teamDiv.addEventListener('click', function() {
        addTeamToChart(teamName);
    });
    
    return teamDiv;
}

// Create team range element for the chart
function createTeamRangeElement(teamName) {
    const teamDiv = document.createElement('div');
    teamDiv.className = 'team-range';
    teamDiv.setAttribute('data-team', teamName);
    
    // No need for team info at bottom since it's now part of the avg slider
    
    // Range bar
    const rangeBar = document.createElement('div');
    rangeBar.className = 'range-bar';
    
    // Range handles
    const highHandle = document.createElement('div');
    highHandle.className = 'range-handle high';
    highHandle.setAttribute('data-type', 'high');
    
    // Average handle is now the team logo and name
    const avgHandle = document.createElement('div');
    avgHandle.className = 'range-handle avg team-avg-slider';
    avgHandle.setAttribute('data-type', 'avg');
    
    // Create logo for average handle
    const avgLogoImg = document.createElement('img');
    avgLogoImg.src = teamData_static[teamName]?.logo || '';
    avgLogoImg.alt = teamAbbreviations[teamName] || teamName.substring(0, 3).toUpperCase();
    avgLogoImg.className = 'avg-logo-img';
    
    // Create name for average handle
    const avgTeamName = document.createElement('div');
    avgTeamName.className = 'avg-team-name';
    avgTeamName.textContent = teamAbbreviations[teamName] || teamName.substring(0, 3).toUpperCase();
    
    // Fallback if logo fails
    avgLogoImg.onerror = function() {
        avgHandle.innerHTML = '';
        avgHandle.appendChild(avgTeamName);
        avgHandle.classList.add('text-only-avg');
    };
    
    avgHandle.appendChild(avgLogoImg);
    avgHandle.appendChild(avgTeamName);
    
    const lowHandle = document.createElement('div');
    lowHandle.className = 'range-handle low';
    lowHandle.setAttribute('data-type', 'low');
    
    teamDiv.appendChild(rangeBar);
    teamDiv.appendChild(highHandle);
    teamDiv.appendChild(avgHandle);
    teamDiv.appendChild(lowHandle);
    
    // Add mouse event listeners for handles
    [highHandle, avgHandle, lowHandle].forEach(handle => {
        handle.addEventListener('mousedown', startHandleDrag);
    });
    
    // Add double-click to remove from chart (on the range bar, not the avg handle)
    rangeBar.addEventListener('dblclick', function() {
        removeTeamFromChart(teamName);
    });
    
    // Don't call updateTeamRangePosition here - it will be called after data is set
    return teamDiv;
}

// No longer need drag and drop functions since teams are click-to-add

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
    
    // FIRST: Set default ranking values when adding to chart
    teamData[teamName].high = 8;
    teamData[teamName].avg = 16;
    teamData[teamName].low = 24;
    teamData[teamName].inChart = true;
    
    
    // Remove from pool
    const poolTeam = document.querySelector(`.teams-container .team[data-team="${teamName}"]`);
    if (poolTeam) {
        poolTeam.remove();
    }
    
    // THEN: Add to chart (createTeamRangeElement will use the correct values)
    const chartContainer = document.getElementById('teams-ranges');
    const teamRangeElement = createTeamRangeElement(teamName);
    chartContainer.appendChild(teamRangeElement);
    
    // NOW update position with the correct data values
    updateTeamRangePosition(teamName);
    
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
    // Find the actual handle element (in case we clicked on a child like img or text)
    const handleElement = e.target.closest('.range-handle');
    currentHandle = {
        element: handleElement,
        teamName: handleElement.closest('.team-range').getAttribute('data-team'),
        type: handleElement.getAttribute('data-type')
    };
    
    // Set this team as active when any handle is clicked
    setActiveTeam(currentHandle.teamName);
    
    document.addEventListener('mousemove', handleHandleDrag);
    document.addEventListener('mouseup', endHandleDrag);
    
    handleElement.style.cursor = 'grabbing';
}

function handleHandleDrag(e) {
    if (!isDraggingHandle || !currentHandle) return;
    
    const chartArea = document.querySelector('.chart-area');
    const rect = chartArea.getBoundingClientRect();
    const chartHeight = rect.height; // No need to account for bottom space anymore
    
    // Calculate position (1-32 rankings, 1=top, 32=bottom)
    const relativeY = e.clientY - rect.top;
    const percentage = Math.max(0, Math.min(1, relativeY / chartHeight));
    let ranking = Math.round(percentage * 31 + 1); // Convert to 1-32 range
    
    // Ensure ranking stays within 1-32 bounds
    ranking = Math.max(1, Math.min(32, ranking));
    
    const teamName = currentHandle.teamName;
    const handleType = currentHandle.type;
    
    // Debug logging
    console.log(`BEFORE: ${handleType} = ${teamData[teamName][handleType]}, NEW = ${ranking}`);
    
    // Update team data
    teamData[teamName][handleType] = ranking;
    
    // Enforce logical constraints (high=best rank=low number, low=worst rank=high number)
    const data = teamData[teamName];
    if (handleType === 'high') {
        // When dragging high handle, ensure avg >= high and low >= avg
        data.avg = Math.max(data.avg, data.high);
        data.low = Math.max(data.low, data.avg);
    } else if (handleType === 'avg') {
        // When dragging avg handle, ensure high <= avg and low >= avg  
        data.high = Math.min(data.high, data.avg);
        data.low = Math.max(data.low, data.avg);
    } else if (handleType === 'low') {
        // When dragging low handle, ensure avg <= low and high <= avg
        data.avg = Math.min(data.avg, data.low);
        data.high = Math.min(data.high, data.avg);
    }
    
    // Ensure all values stay within 1-32 bounds after constraints
    data.high = Math.max(1, Math.min(32, data.high));
    data.avg = Math.max(1, Math.min(32, data.avg));
    data.low = Math.max(1, Math.min(32, data.low));
    
    // Debug logging
    console.log(`AFTER CONSTRAINTS: High=${data.high}, Avg=${data.avg}, Low=${data.low}`);
    
    updateTeamRangePosition(teamName);
    // Only sort if NOT dragging the average handle
    if (handleType !== 'avg') {
        sortTeamsByAverage();
    }
    saveData();
}

function endHandleDrag() {
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
    const chartHeight = document.querySelector('.chart-area').offsetHeight;
    
    
    // Calculate positions (rank 1 = top, rank 32 = bottom)
    const highPos = (data.high - 1) / 31 * chartHeight;
    const avgPos = (data.avg - 1) / 31 * chartHeight;
    const lowPos = (data.low - 1) / 31 * chartHeight;
    
    // Debug logging
    console.log(`POSITION UPDATE: ${teamName} - H:${data.high}(${highPos}px) A:${data.avg}(${avgPos}px) L:${data.low}(${lowPos}px) ChartHeight:${chartHeight}`);
    
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
    
    // Sort by average ranking (ascending - best ranks first)
    teamElements.sort((a, b) => {
        const teamA = a.getAttribute('data-team');
        const teamB = b.getAttribute('data-team');
        return teamData[teamA].avg - teamData[teamB].avg;
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
    
    // Event listeners
    document.getElementById('reset-btn').addEventListener('click', resetRankings);
    window.addEventListener('resize', handleResize);
    
    // View toggle placeholder
    document.getElementById('view-toggle').addEventListener('click', function() {
        alert('Tier view coming soon!');
    });
});