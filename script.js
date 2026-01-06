// Conduit Fill Calculator - Main JavaScript File

// Conduit internal cross-sectional areas (in square inches) - NEC Chapter 9 Table 4
const CONDUIT_AREAS = {
    'EMT': {
        '0.5': 0.304, '0.75': 0.533, '1': 0.864, '1.25': 1.496, '1.5': 2.036,
        '2': 3.356, '2.5': 5.858, '3': 8.846, '3.5': 11.545, '4': 14.753,
        '5': 23.000, '6': 33.183
    },
    'PVC40': {
        '0.5': 0.285, '0.75': 0.508, '1': 0.832, '1.25': 1.453, '1.5': 1.986,
        '2': 3.291, '2.5': 5.858, '3': 8.688, '3.5': 11.427, '4': 14.753,
        '5': 22.870, '6': 33.103
    },
    'PVC80': {
        '0.5': 0.217, '0.75': 0.409, '1': 0.688, '1.25': 1.225, '1.5': 1.711,
        '2': 2.874, '2.5': 5.022, '3': 7.592, '3.5': 9.897, '4': 12.794,
        '5': 20.212, '6': 28.567
    },
    'RMC': {
        '0.5': 0.304, '0.75': 0.549, '1': 0.887, '1.25': 1.526, '1.5': 2.071,
        '2': 3.408, '2.5': 5.858, '3': 8.814, '3.5': 11.663, '4': 15.000,
        '5': 23.000, '6': 33.183
    },
    'IMC': {
        '0.5': 0.342, '0.75': 0.586, '1': 0.959, '1.25': 1.647, '1.5': 2.225,
        '2': 3.630, '2.5': 6.442, '3': 9.701, '3.5': 12.692, '4': 16.269,
        '5': 25.623, '6': 36.260
    },
    'FMC': {
        '0.5': 0.304, '0.75': 0.511, '1': 0.817, '1.25': 1.369, '1.5': 1.858,
        '2': 3.099, '2.5': 5.027, '3': 7.475, '3.5': 9.621, '4': 12.566
    },
    'LFMC': {
        '0.5': 0.304, '0.75': 0.511, '1': 0.817, '1.25': 1.369, '1.5': 1.858,
        '2': 3.099, '2.5': 5.027, '3': 7.475, '3.5': 9.621, '4': 12.566
    }
};

// Wire cross-sectional areas (in square inches) including insulation - NEC Chapter 9 Table 5
const WIRE_AREAS = {
    'THHN': {
        '14': 0.0097, '12': 0.0133, '10': 0.0211, '8': 0.0366,
        '6': 0.0507, '4': 0.0824, '3': 0.0973, '2': 0.1158,
        '1': 0.1562, '1/0': 0.1855, '2/0': 0.2223, '3/0': 0.2679,
        '4/0': 0.3237, '250': 0.397, '300': 0.458, '350': 0.519,
        '400': 0.578, '500': 0.700, '600': 0.843, '750': 1.001,
        '1000': 1.317
    },
    'THWN-2': {
        '14': 0.0097, '12': 0.0133, '10': 0.0211, '8': 0.0366,
        '6': 0.0507, '4': 0.0824, '3': 0.0973, '2': 0.1158,
        '1': 0.1562, '1/0': 0.1855, '2/0': 0.2223, '3/0': 0.2679,
        '4/0': 0.3237, '250': 0.397, '300': 0.458, '350': 0.519,
        '400': 0.578, '500': 0.700, '600': 0.843, '750': 1.001,
        '1000': 1.317
    },
    'XHHW': {
        '14': 0.0097, '12': 0.0133, '10': 0.0211, '8': 0.0366,
        '6': 0.0590, '4': 0.0814, '3': 0.0962, '2': 0.1146,
        '1': 0.1534, '1/0': 0.1825, '2/0': 0.2190, '3/0': 0.2642,
        '4/0': 0.3197, '250': 0.3904, '300': 0.4536, '350': 0.5113,
        '400': 0.5673, '500': 0.6837, '600': 0.8316, '750': 0.9834,
        '1000': 1.3035
    },
    'XHHW-2': {
        '14': 0.0097, '12': 0.0133, '10': 0.0211, '8': 0.0366,
        '6': 0.0590, '4': 0.0814, '3': 0.0962, '2': 0.1146,
        '1': 0.1534, '1/0': 0.1825, '2/0': 0.2190, '3/0': 0.2642,
        '4/0': 0.3197, '250': 0.3904, '300': 0.4536, '350': 0.5113,
        '400': 0.5673, '500': 0.6837, '600': 0.8316, '750': 0.9834,
        '1000': 1.3035
    },
    'RHH': {
        '14': 0.0293, '12': 0.0353, '10': 0.0437, '8': 0.0835,
        '6': 0.1041, '4': 0.1333, '3': 0.1521, '2': 0.1750,
        '1': 0.2660, '1/0': 0.3039, '2/0': 0.3505, '3/0': 0.4072,
        '4/0': 0.4754, '250': 0.6291, '300': 0.7088, '350': 0.7870,
        '400': 0.8626, '500': 1.0082, '600': 1.2135, '750': 1.4272,
        '1000': 1.7719
    },
    'RHW': {
        '14': 0.0293, '12': 0.0353, '10': 0.0437, '8': 0.0835,
        '6': 0.1041, '4': 0.1333, '3': 0.1521, '2': 0.1750,
        '1': 0.2660, '1/0': 0.3039, '2/0': 0.3505, '3/0': 0.4072,
        '4/0': 0.4754, '250': 0.6291, '300': 0.7088, '350': 0.7870,
        '400': 0.8626, '500': 1.0082, '600': 1.2135, '750': 1.4272,
        '1000': 1.7719
    },
    'RHW-2': {
        '14': 0.0293, '12': 0.0353, '10': 0.0437, '8': 0.0835,
        '6': 0.1041, '4': 0.1333, '3': 0.1521, '2': 0.1750,
        '1': 0.2660, '1/0': 0.3039, '2/0': 0.3505, '3/0': 0.4072,
        '4/0': 0.4754, '250': 0.6291, '300': 0.7088, '350': 0.7870,
        '400': 0.8626, '500': 1.0082, '600': 1.2135, '750': 1.4272,
        '1000': 1.7719
    },
    'USE-2': {
        '14': 0.0139, '12': 0.0181, '10': 0.0243, '8': 0.0437,
        '6': 0.0590, '4': 0.0814, '3': 0.0962, '2': 0.1146,
        '1': 0.1534, '1/0': 0.1825, '2/0': 0.2190, '3/0': 0.2642,
        '4/0': 0.3197, '250': 0.3904, '300': 0.4536, '350': 0.5113,
        '400': 0.5673, '500': 0.6837, '600': 0.8316, '750': 0.9834,
        '1000': 1.3035
    },
    'TW': {
        '14': 0.0139, '12': 0.0181, '10': 0.0243, '8': 0.0437,
        '6': 0.0726, '4': 0.1158, '3': 0.1333, '2': 0.1534,
        '1': 0.2660, '1/0': 0.3039, '2/0': 0.3505, '3/0': 0.4072,
        '4/0': 0.4754
    }
};

// Store added wires
let addedWires = [];

// Initialize calculator
document.addEventListener('DOMContentLoaded', function() {
    // Add some default wires for demo
    // Auto-calculate on page load is disabled by default
});

// Add wire to the list
function addWire() {
    const wireType = document.getElementById('wireType').value;
    const wireSize = document.getElementById('wireSize').value;
    const wireCount = parseInt(document.getElementById('wireCount').value);

    if (wireCount < 1) {
        alert('Please enter a valid quantity (minimum 1)');
        return;
    }

    // Get wire area
    const wireArea = WIRE_AREAS[wireType][wireSize];
    if (!wireArea) {
        alert('Wire size not available for selected type');
        return;
    }

    // Add to array
    const wire = {
        id: Date.now(),
        type: wireType,
        size: wireSize,
        count: wireCount,
        area: wireArea
    };
    addedWires.push(wire);

    // Update display
    updateWiresList();
}

// Update wires list display
function updateWiresList() {
    const wiresList = document.getElementById('wiresList');
    
    if (addedWires.length === 0) {
        wiresList.innerHTML = '<p style="color: #6b7280; font-style: italic;">No wires added yet. Add wires using the form below.</p>';
        return;
    }

    wiresList.innerHTML = addedWires.map(wire => `
        <div class="wire-item">
            <div class="wire-item-info">
                <strong>${wire.count}x</strong> ${wire.type} ${wire.size} AWG
                <span style="color: #6b7280; font-size: 0.9rem;">(${(wire.area * wire.count).toFixed(4)} sq.in total)</span>
            </div>
            <button class="btn-remove" onclick="removeWire(${wire.id})">🗑️ Remove</button>
        </div>
    `).join('');
}

// Remove wire from list
function removeWire(wireId) {
    addedWires = addedWires.filter(wire => wire.id !== wireId);
    updateWiresList();
    calculate();
}

// Main calculation function
function calculate() {
    const resultsDiv = document.getElementById('results');

    // Check if any wires are added
    if (addedWires.length === 0) {
        resultsDiv.innerHTML = `
            <div class="empty-state">
                <p>⚠️ Please add at least one wire to calculate fill</p>
            </div>
        `;
        return;
    }

    // Get conduit parameters
    const conduitType = document.getElementById('conduitType').value;
    const conduitSize = document.getElementById('conduitSize').value;
    const unitSystem = document.getElementById('unitSystem').value;

    // Get conduit area
    const conduitArea = CONDUIT_AREAS[conduitType][conduitSize];
    if (!conduitArea) {
        resultsDiv.innerHTML = `
            <div class="empty-state">
                <p>⚠️ Invalid conduit size for selected type</p>
            </div>
        `;
        return;
    }

    // Calculate total wire area
    let totalWireArea = 0;
    let totalWireCount = 0;
    
    addedWires.forEach(wire => {
        totalWireArea += wire.area * wire.count;
        totalWireCount += wire.count;
    });

    // Determine NEC fill percentage limit
    let maxFillPercent;
    if (totalWireCount === 1) {
        maxFillPercent = 53;
    } else if (totalWireCount === 2) {
        maxFillPercent = 31;
    } else {
        maxFillPercent = 40;
    }

    // Calculate current fill percentage
    const fillPercent = (totalWireArea / conduitArea) * 100;
    const isCompliant = fillPercent <= maxFillPercent;
    const availableArea = conduitArea - totalWireArea;

    // Determine status
    let status, statusClass;
    if (fillPercent <= maxFillPercent * 0.8) {
        status = '✅ Well Below Limit';
        statusClass = 'status-pass';
    } else if (fillPercent <= maxFillPercent) {
        status = '⚠️ Within Limit';
        statusClass = 'status-warning';
    } else {
        status = '❌ Exceeds NEC Limit';
        statusClass = 'status-fail';
    }

    // Derating information
    const includeDerating = document.getElementById('derating').checked;
    let deratingInfo = '';
    
    if (includeDerating && totalWireCount > 3) {
        let deratingFactor;
        if (totalWireCount <= 6) deratingFactor = 0.8;
        else if (totalWireCount <= 9) deratingFactor = 0.7;
        else if (totalWireCount <= 20) deratingFactor = 0.5;
        else if (totalWireCount <= 30) deratingFactor = 0.45;
        else if (totalWireCount <= 40) deratingFactor = 0.4;
        else deratingFactor = 0.35;

        deratingInfo = `
            <div class="result-details" style="background: #fef3c7; border-left: 4px solid #f59e0b;">
                <h4 style="color: #d97706; margin-bottom: 0.5rem;">⚡ Ampacity Derating Required</h4>
                <p style="margin-bottom: 0.5rem;">With ${totalWireCount} current-carrying conductors, apply a ${(deratingFactor * 100)}% derating factor per NEC 310.15(C)(1).</p>
                <p style="font-size: 0.9rem; color: #92400e;">Note: Ground wires are not counted as current-carrying conductors.</p>
            </div>
        `;
    }

    // Unit conversion
    let conduitAreaDisplay, totalWireAreaDisplay, availableAreaDisplay;
    if (unitSystem === 'metric') {
        conduitAreaDisplay = (conduitArea * 645.16).toFixed(2) + ' mm²';
        totalWireAreaDisplay = (totalWireArea * 645.16).toFixed(2) + ' mm²';
        availableAreaDisplay = (availableArea * 645.16).toFixed(2) + ' mm²';
    } else {
        conduitAreaDisplay = conduitArea.toFixed(4) + ' in²';
        totalWireAreaDisplay = totalWireArea.toFixed(4) + ' in²';
        availableAreaDisplay = availableArea.toFixed(4) + ' in²';
    }

    // Progress bar color
    let progressClass = '';
    if (fillPercent > maxFillPercent) {
        progressClass = 'danger';
    } else if (fillPercent > maxFillPercent * 0.8) {
        progressClass = 'warning';
    }

    // Generate results HTML
    resultsDiv.innerHTML = `
        <div class="result-summary">
            <h3 style="margin-bottom: 0.5rem;">Fill Percentage</h3>
            <div class="fill-percentage">${fillPercent.toFixed(1)}%</div>
            <div class="progress-bar">
                <div class="progress-fill ${progressClass}" style="width: ${Math.min(fillPercent, 100)}%">
                    ${fillPercent.toFixed(1)}%
                </div>
            </div>
            <span class="status-badge ${statusClass}">${status}</span>
            <p style="margin-top: 1rem; font-size: 0.95rem;">NEC Maximum: ${maxFillPercent}% for ${totalWireCount} conductor${totalWireCount > 1 ? 's' : ''}</p>
        </div>

        <div class="result-details">
            <h4 style="margin-bottom: 1rem; color: #1f2937;">📐 Conduit Information</h4>
            <div class="result-row">
                <span class="result-label">Conduit Type:</span>
                <span class="result-value">${getConduitTypeName(conduitType)}</span>
            </div>
            <div class="result-row">
                <span class="result-label">Conduit Size:</span>
                <span class="result-value">${conduitSize} inch</span>
            </div>
            <div class="result-row">
                <span class="result-label">Internal Area:</span>
                <span class="result-value">${conduitAreaDisplay}</span>
            </div>
        </div>

        <div class="result-details">
            <h4 style="margin-bottom: 1rem; color: #1f2937;">🔌 Wire Fill Information</h4>
            <div class="result-row">
                <span class="result-label">Total Conductors:</span>
                <span class="result-value">${totalWireCount}</span>
            </div>
            <div class="result-row">
                <span class="result-label">Total Wire Area:</span>
                <span class="result-value">${totalWireAreaDisplay}</span>
            </div>
            <div class="result-row">
                <span class="result-label">Available Area:</span>
                <span class="result-value" style="color: ${availableArea >= 0 ? '#10b981' : '#ef4444'}">${availableAreaDisplay}</span>
            </div>
            <div class="result-row">
                <span class="result-label">Fill Percentage:</span>
                <span class="result-value" style="color: ${isCompliant ? '#10b981' : '#ef4444'}">${fillPercent.toFixed(2)}%</span>
            </div>
        </div>

        ${deratingInfo}

        <div class="wires-summary">
            <h4>📋 Wires Breakdown</h4>
            ${addedWires.map(wire => `
                <div class="wire-summary-item">
                    <strong>${wire.count}x</strong> ${wire.type} ${wire.size} AWG 
                    - ${unitSystem === 'metric' ? 
                        (wire.area * wire.count * 645.16).toFixed(2) + ' mm²' : 
                        (wire.area * wire.count).toFixed(4) + ' in²'}
                </div>
            `).join('')}
        </div>

        ${!isCompliant ? `
            <div class="result-details" style="background: #fee2e2; border-left: 4px solid #ef4444;">
                <h4 style="color: #dc2626; margin-bottom: 0.5rem;">❌ Non-Compliant Installation</h4>
                <p style="color: #991b1b;">This configuration exceeds NEC maximum fill requirements. Consider:</p>
                <ul style="margin-left: 1.5rem; color: #991b1b; margin-top: 0.5rem;">
                    <li>Using a larger conduit size</li>
                    <li>Reducing the number of conductors</li>
                    <li>Running multiple conduits</li>
                    <li>Using smaller wire gauge (if load permits)</li>
                </ul>
            </div>
        ` : ''}

        ${isCompliant && fillPercent > maxFillPercent * 0.9 ? `
            <div class="result-details" style="background: #fef3c7; border-left: 4px solid #f59e0b;">
                <h4 style="color: #d97706; margin-bottom: 0.5rem;">⚠️ Near Maximum Capacity</h4>
                <p style="color: #92400e;">While compliant, this installation is near maximum fill. Consider using a larger conduit for easier installation and future expansion.</p>
            </div>
        ` : ''}
    `;
}

// Get conduit type full name
function getConduitTypeName(type) {
    const names = {
        'EMT': 'EMT (Electrical Metallic Tubing)',
        'PVC40': 'PVC Schedule 40',
        'PVC80': 'PVC Schedule 80',
        'RMC': 'RMC (Rigid Metal Conduit)',
        'IMC': 'IMC (Intermediate Metal Conduit)',
        'FMC': 'FMC (Flexible Metal Conduit)',
        'LFMC': 'LFMC (Liquidtight Flexible Metal)'
    };
    return names[type] || type;
}

// Reset calculator
function resetCalculator() {
    addedWires = [];
    updateWiresList();
    document.getElementById('results').innerHTML = `
        <div class="empty-state">
            <p>👆 Add wires and click "Calculate Fill" to see results</p>
        </div>
    `;
    
    // Reset form fields to defaults
    document.getElementById('conduitType').value = 'EMT';
    document.getElementById('conduitSize').value = '1';
    document.getElementById('wireType').value = 'THHN';
    document.getElementById('wireSize').value = '12';
    document.getElementById('wireCount').value = '3';
    document.getElementById('includeGround').checked = true;
    document.getElementById('derating').checked = false;
    document.getElementById('unitSystem').value = 'imperial';
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Enter key to add wire
    if (e.key === 'Enter' && document.activeElement.id !== 'wireCount') {
        e.preventDefault();
        addWire();
    }
    
    // Ctrl/Cmd + Enter to calculate
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        calculate();
    }
});

// Auto-save to localStorage
function saveToLocalStorage() {
    localStorage.setItem('conduitCalculatorWires', JSON.stringify(addedWires));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('conduitCalculatorWires');
    if (saved) {
        try {
            addedWires = JSON.parse(saved);
            updateWiresList();
        } catch (e) {
            console.error('Error loading saved data:', e);
        }
    }
}

// Load saved data on page load
document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
    updateWiresList();
});

// Save before page unload
window.addEventListener('beforeunload', function() {
    saveToLocalStorage();
});

