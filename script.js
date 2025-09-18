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
    teamDiv.className = 'team-item';
    teamDiv.setAttribute('data-team', teamName);
    
    // Create logo image
    const logoImg = document.createElement('img');
    logoImg.src = teamData_static[teamName]?.logo || '';
    logoImg.alt = teamName;
    logoImg.className = 'team-logo';
    
    // Fallback text if image fails to load
    logoImg.onerror = function() {
        logoImg.style.display = 'none';
        const teamNameSpan = document.createElement('span');
        teamNameSpan.textContent = teamName;
        teamNameSpan.style.fontSize = '14px';
        teamNameSpan.style.marginTop = '20px';
        teamDiv.appendChild(teamNameSpan);
    };
    
    teamDiv.appendChild(logoImg);
    
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
    avgHandle.className = 'range-handle avg';
    avgHandle.setAttribute('data-type', 'avg');
    
    // Create container for logo and text
    const avgSlider = document.createElement('div');
    avgSlider.className = 'team-avg-slider';
    
    // Create logo for average handle
    const avgLogoImg = document.createElement('img');
    avgLogoImg.src = teamData_static[teamName]?.logo || '';
    avgLogoImg.alt = teamAbbreviations[teamName] || teamName.substring(0, 3).toUpperCase();
    avgLogoImg.className = 'avg-logo-img';
    
    // Create name for average handle
    const avgTeamName = document.createElement('div');
    avgTeamName.className = 'avg-team-name';
    avgTeamName.textContent = '16'; // Default rank, will be updated by updateTeamRangePosition
    
    // Fallback if logo fails
    avgLogoImg.onerror = function() {
        avgSlider.innerHTML = '';
        avgSlider.appendChild(avgTeamName);
        avgHandle.classList.add('text-only-avg');
    };
    
    avgSlider.appendChild(avgLogoImg);
    avgSlider.appendChild(avgTeamName);
    avgHandle.appendChild(avgSlider);
    
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
    
    // Use teams-ranges container for BOTH mouse calculation AND visual positioning
    const teamsRanges = document.querySelector('.teams-ranges');
    const rect = teamsRanges.getBoundingClientRect();
    
    // Calculate mouse position within the container (no padding adjustments)
    const relativeY = e.clientY - rect.top;
    const percentage = relativeY / rect.height;
    
    // Clamp percentage to 0-1 range
    const clampedPercentage = Math.max(0, Math.min(1, percentage));
    
    // Convert directly to 1-32 ranking
    let ranking = Math.round(clampedPercentage * 31) + 1;
    
    const teamName = currentHandle.teamName;
    const handleType = currentHandle.type;
    
    console.log(`Mouse: ${relativeY}px, Height: ${rect.height}px, Percent: ${clampedPercentage}, Rank: ${ranking}`);
    
    // Update team data
    teamData[teamName][handleType] = ranking;
    
    // Enforce logical constraints
    const data = teamData[teamName];
    if (handleType === 'high') {
        data.avg = Math.max(data.avg, data.high);
        data.low = Math.max(data.low, data.avg);
    } else if (handleType === 'avg') {
        data.high = Math.min(data.high, data.avg);
        data.low = Math.max(data.low, data.avg);
    } else if (handleType === 'low') {
        data.avg = Math.min(data.avg, data.low);
        data.high = Math.min(data.high, data.avg);
    }
    
    // Ensure bounds
    data.high = Math.max(1, Math.min(32, data.high));
    data.avg = Math.max(1, Math.min(32, data.avg));
    data.low = Math.max(1, Math.min(32, data.low));
    
    console.log(`Final: High=${data.high}, Avg=${data.avg}, Low=${data.low}`);
    
    updateTeamRangePosition(teamName);
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
    const teamsRanges = document.querySelector('.teams-ranges');
    const containerHeight = teamsRanges.offsetHeight;
    
    // Convert ranking to pixel position within the teams-ranges container
    // Rank 1 = 0px, Rank 32 = full container height
    const highPos = ((data.high - 1) / 31) * containerHeight;
    const avgPos = ((data.avg - 1) / 31) * containerHeight;
    const lowPos = ((data.low - 1) / 31) * containerHeight;
    
    console.log(`VISUAL: ${teamName} - Rank ${data.high} -> ${highPos}px, Rank ${data.avg} -> ${avgPos}px, Rank ${data.low} -> ${lowPos}px (Container: ${containerHeight}px)`);
    
    // Update range bar
    const rangeBar = teamElement.querySelector('.range-bar');
    rangeBar.style.top = `${highPos}px`;
    rangeBar.style.height = `${Math.max(2, lowPos - highPos)}px`;
    
    // Update handles (center them on the calculated position)
    const handleHeight = 16; // Standard handle height
    const avgHandleHeight = 32; // Avg handle is taller
    
    const highHandle = teamElement.querySelector('.range-handle.high');
    const avgHandle = teamElement.querySelector('.range-handle.avg');
    const lowHandle = teamElement.querySelector('.range-handle.low');
    
    highHandle.style.top = `${highPos - handleHeight/2}px`;
    highHandle.setAttribute('data-rank', data.high);
    
    avgHandle.style.top = `${avgPos - avgHandleHeight/2}px`;
    
    // Update avg handle text and reorder elements based on ranking
    const avgTeamName = avgHandle.querySelector('.avg-team-name');
    const avgLogo = avgHandle.querySelector('.avg-logo-img');
    const slider = avgHandle.querySelector('.team-avg-slider');
    
    if (avgTeamName && avgLogo && slider) {
        console.log(`DEBUG: Updating ${teamName} to rank ${data.avg}`);
        
        // Set the rank number
        avgTeamName.textContent = data.avg;
        
        // Color code based on ranking with green-yellow-red gradient
        function getRankColor(rank) {
            const normalized = (rank - 1) / 31;
            let red, green, blue = 0;
            
            if (normalized <= 0.5) {
                red = Math.round(255 * (normalized * 2));
                green = 255;
            } else {
                red = 255;
                green = Math.round(255 * (1 - (normalized - 0.5) * 2));
            }
            
            return `rgb(${red}, ${green}, ${blue})`;
        }
        
        const color = getRankColor(data.avg);
        console.log(`DEBUG: Setting color to ${color} for rank ${data.avg}`);
        avgTeamName.style.color = color;
        
        // Reorder elements based on ranking (without clearing innerHTML)
        if (data.avg >= 17) {
            // Rank 17-32: rank on top, logo below
            console.log(`DEBUG: Rank ${data.avg} >= 17, putting rank on top`);
            if (slider.firstChild !== avgTeamName) {
                slider.insertBefore(avgTeamName, slider.firstChild);
            }
        } else {
            // Rank 1-16: logo on top, rank below
            console.log(`DEBUG: Rank ${data.avg} < 17, putting logo on top`);
            if (slider.firstChild !== avgLogo) {
                slider.insertBefore(avgLogo, slider.firstChild);
            }
        }
    } else {
        console.log(`DEBUG: Missing elements for ${teamName}:`, {avgTeamName, avgLogo, slider});
    }
    
    lowHandle.style.top = `${lowPos - handleHeight/2}px`;
    lowHandle.setAttribute('data-rank', data.low);
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

// Sort teams by ranking value
function sortTeamsByRanking(rankingType = 'avg') {
    const container = document.getElementById('teams-ranges');
    const teamElements = Array.from(container.children);
    
    // Sort by the specified ranking (ascending - best ranks first)
    teamElements.sort((a, b) => {
        const teamA = a.getAttribute('data-team');
        const teamB = b.getAttribute('data-team');
        return teamData[teamA][rankingType] - teamData[teamB][rankingType];
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

// Store the randomized team queue
let teamQueue = [];

// Initialize team queue with randomized order
function initializeTeamQueue() {
    const availableTeams = nflTeams.filter(teamName => !teamData[teamName].inChart);
    teamQueue = [...availableTeams].sort(() => Math.random() - 0.5);
}

// Populate up next teams (up to 3)
function populateRandomTeams() {
    const container = document.getElementById('random-teams-container');
    const remainingCounter = document.getElementById('teams-remaining');
    container.innerHTML = '';
    
    // Filter out teams that are already in the chart from the queue
    teamQueue = teamQueue.filter(teamName => !teamData[teamName].inChart);
    
    // If queue is empty or needs refresh, initialize it
    if (teamQueue.length === 0) {
        initializeTeamQueue();
    }
    
    // Update remaining count
    const totalRemaining = nflTeams.filter(teamName => !teamData[teamName].inChart).length;
    remainingCounter.textContent = `${totalRemaining} remaining`;
    
    // Show up to 3 teams from the queue that are not in chart
    const availableTeams = teamQueue.filter(teamName => !teamData[teamName].inChart);
    const teamsToShow = Math.min(3, availableTeams.length);
    
    for (let i = 0; i < teamsToShow; i++) {
        if (availableTeams[i]) {
            const teamName = availableTeams[i];
            const teamElement = createTeamElement(teamName);
            teamElement.onclick = () => {
                addTeamToChart(teamName);
                // Remove the clicked team from queue
                teamQueue = teamQueue.filter(t => t !== teamName);
                // Refresh display with next team moving into position
                populateRandomTeams();
            };
            container.appendChild(teamElement);
        }
    }
}

// Reset all rankings
function resetRankings() {
    // Clear chart
    document.getElementById('teams-ranges').innerHTML = '';
    
    // Reset data and active team
    initializeTeamData();
    activeTeam = null;
    
    // Reset the team queue and repopulate
    teamQueue = [];
    populateRandomTeams();
    
    saveData();
}

// Add all teams to chart
function addAllTeams() {
    nflTeams.forEach(teamName => {
        if (!teamData[teamName].inChart) {
            addTeamToChart(teamName);
        }
    });
    // Refresh up next display after adding all teams
    populateRandomTeams();
}

// Export data functionality
function exportData() {
    // Get the current page title
    const pageTitle = document.getElementById('page-title').textContent;
    
    // Get teams that are currently in the chart
    const teamsInChart = nflTeams.filter(teamName => teamData[teamName].inChart);
    
    if (teamsInChart.length === 0) {
        alert('No teams in chart to export!');
        return;
    }
    
    // Create CSV content
    let csvContent = `"${pageTitle}"\n\n`;
    csvContent += 'Team,High,Avg,Low\n';
    
    // Sort teams by average ranking for export
    teamsInChart.sort((a, b) => teamData[a].avg - teamData[b].avg);
    
    teamsInChart.forEach(teamName => {
        const data = teamData[teamName];
        const abbr = teamData_static[teamName]?.abbr || teamName;
        csvContent += `${abbr},${data.high},${data.avg},${data.low}\n`;
    });
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nfl-rankings-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Import data functionality
function importData() {
    const fileInput = document.getElementById('import-file');
    fileInput.click();
}

function handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const csvContent = e.target.result;
        parseAndApplyCSV(csvContent);
    };
    reader.readAsText(file);
    
    // Reset file input
    event.target.value = '';
}

function parseAndApplyCSV(csvContent) {
    const lines = csvContent.trim().split('\n');
    
    if (lines.length < 3) {
        alert('Invalid CSV format');
        return;
    }
    
    // Extract page title (first line, remove quotes)
    const pageTitle = lines[0].replace(/^"|"$/g, '');
    
    // Find the header line (should be "Team,High,Avg,Low")
    let dataStartIndex = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() === 'Team,High,Avg,Low') {
            dataStartIndex = i + 1;
            break;
        }
    }
    
    if (dataStartIndex === -1) {
        alert('Could not find data header in CSV');
        return;
    }
    
    // Reset current data
    resetRankings();
    
    // Apply page title
    document.getElementById('page-title').textContent = pageTitle;
    
    // Parse team data
    const importedTeams = [];
    for (let i = dataStartIndex; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const parts = line.split(',');
        if (parts.length !== 4) continue;
        
        const [abbr, high, avg, low] = parts;
        
        // Find team name by abbreviation
        const teamName = Object.keys(teamData_static).find(name => 
            teamData_static[name].abbr === abbr
        );
        
        if (teamName) {
            const highVal = parseInt(high);
            const avgVal = parseInt(avg);
            const lowVal = parseInt(low);
            
            if (!isNaN(highVal) && !isNaN(avgVal) && !isNaN(lowVal)) {
                importedTeams.push({
                    name: teamName,
                    high: Math.max(1, Math.min(32, highVal)),
                    avg: Math.max(1, Math.min(32, avgVal)),
                    low: Math.max(1, Math.min(32, lowVal))
                });
            }
        }
    }
    
    // Apply imported team data
    importedTeams.forEach(team => {
        teamData[team.name] = {
            high: team.high,
            avg: team.avg,
            low: team.low,
            inChart: true
        };
        
        const chartContainer = document.getElementById('teams-ranges');
        const teamRangeElement = createTeamRangeElement(team.name);
        chartContainer.appendChild(teamRangeElement);
        updateTeamRangePosition(team.name);
    });
    
    // Sort and refresh display
    sortTeamsByAverage();
    populateRandomTeams();
    saveData();
    
    alert(`Imported ${importedTeams.length} teams successfully!`);
}

// Save/Load data
function saveData() {
    localStorage.setItem('nflRangeData', JSON.stringify(teamData));
}

function loadData() {
    // Always start fresh - don't load saved data
    initializeTeamData();
    
    // Reset active team on load
    activeTeam = null;
    
    // Clear chart completely
    const chartContainer = document.getElementById('teams-ranges');
    chartContainer.innerHTML = '';
    
    // Populate random teams
    populateRandomTeams();
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
    document.getElementById('add-all-btn').addEventListener('click', addAllTeams);
    document.getElementById('export-btn').addEventListener('click', exportData);
    document.getElementById('import-btn').addEventListener('click', importData);
    document.getElementById('import-file').addEventListener('change', handleFileImport);
    document.getElementById('sort-high-btn').addEventListener('click', () => sortTeamsByRanking('high'));
    document.getElementById('sort-avg-btn').addEventListener('click', () => sortTeamsByRanking('avg'));
    document.getElementById('sort-low-btn').addEventListener('click', () => sortTeamsByRanking('low'));
    window.addEventListener('resize', handleResize);
    
    // Click elsewhere to clear selection
    document.addEventListener('click', function(e) {
        // Check if click was outside of any team range or handle
        if (!e.target.closest('.team-range') && !e.target.closest('.range-handle')) {
            setActiveTeam(null);
        }
    });
    
    // Click on chart area to clear selection
    document.querySelector('.chart-area').addEventListener('click', function(e) {
        // Only clear if clicking directly on chart area, not on team elements
        if (e.target === this || e.target.classList.contains('teams-ranges') || e.target.classList.contains('grid-lines') || e.target.classList.contains('grid-line')) {
            setActiveTeam(null);
        }
    });
    
    // Handle Enter key for page title editing
    document.getElementById('page-title').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.blur(); // Remove focus to apply the edit
        }
    });
});