import React, { useState } from 'react';

const FilterPanel = ({ filters, onFilterChange }) => {
    const [selectedFilters, setSelectedFilters] = useState({});

    const handleFilterChange = (filterName, value) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: value
        }));
        // Викликати функцію onFilterChange з актуальними фільтрами
        onFilterChange(selectedFilters);
    };

    return (
        <div className="filter-panel">
            <h3>Фільтри:</h3>
            {/* Додати розміщення фільтрів */}
            {filters.map(filter => (
                <div key={filter.name} className="filter-item">
                    <h4>{filter.label}</h4>
                    {filter.type === 'select' && (
                        <select
                            value={selectedFilters[filter.name] || ''}
                            onChange={e => handleFilterChange(filter.name, e.target.value)}
                        >
                            <option value="">Усі</option>
                            {filter.options.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    )}
                    {filter.type === 'checkbox' && (
                        <>
                            {filter.options.map(option => (
                                <label key={option} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={selectedFilters[filter.name] && selectedFilters[filter.name].includes(option)}
                                        onChange={e => {
                                            const checked = e.target.checked;
                                            handleFilterChange(filter.name, updateCheckboxFilters(selectedFilters[filter.name], option, checked));
                                        }}
                                    />
                                    {option}
                                </label>
                            ))}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

// Допоміжна функція для оновлення значень фільтрів типу checkbox
const updateCheckboxFilters = (filters, option, checked) => {
    if (!filters) {
        filters = [];
    }
    if (checked) {
        return [...filters, option];
    } else {
        return filters.filter(item => item !== option);
    }
};

export default FilterPanel;