import $ from './dom';

export default function getEditor(parent, column) {
    const type = column.type;
    switch (type) {
        case 'date':
            return getDateEditor(parent);
        case 'number':
            return getNumberEditor(parent);
        case 'checkbox':
            return getCheckboxEditor(parent);
        case 'select':
        case 'dropdown':
            if (!column.options || !Array.isArray(column.options)) {
                return getDefaultEditor(parent);
            }
            return getDropdownEditor(parent, column.options || []);
        default:
            return getDefaultEditor(parent);
    }
};

const getDefaultEditor = function (parent) {
    const $input = $.create('input', {
        class: 'dt-input',
        type: 'text',
        inside: parent
    });

    return {
        initValue(value) {
            $input.focus();
            $input.value = value;
        },
        getValue() {
            return $input.value;
        },
        setValue(value) {
            $input.value = value;
        }
    };
};

const getDateEditor = function (parent) {
    const $input = $.create('input', {
        class: 'dt-input',
        type: 'date',
        inside: parent
    });

    return {
        initValue(value) {
            $input.focus();
            $input.value = value;
        },
        getValue() {
            return $input.value;
        },
        setValue(value) {
            $input.value = value;
        }
    };
};

const getNumberEditor = function (parent) {
    const $input = $.create('input', {
        class: 'dt-input',
        type: 'number',
        inside: parent
    });

    return {
        initValue(value) {
            $input.focus();
            $input.value = value;
        },
        getValue() {
            return $input.value;
        },
        setValue(value) {
            $input.value = value;
        }
    };
};

const getCheckboxEditor = function (parent) {
    const $input = $.create('input', {
        class: 'dt-input',
        type: 'checkbox',
        inside: parent
    });

    return {
        initValue(value) {
            $input.focus();
            $input.checked = value === true || value === 'true' || value === 1 || value === '1';
        },
        getValue() {
            return $input.checked;
        },
        setValue(value) {
            $input.checked = value === true || value === 'true' || value === 1 || value === '1';
        }
    };
};

const getDropdownEditor = function (parent, options) {
    const $select = $.create('select', {
        class: 'dt-input',
        inside: parent
    });

    if (options.length > 0) {
        const firstOption = options[0];
        if (typeof firstOption === 'object' && firstOption.value !== undefined && firstOption.label !== undefined) {
            for (let option of options) {
                const $option = document.createElement('option');
                $option.value = option.value;
                $option.textContent = option.label;
                $select.appendChild($option);
            }
        } else {
            for (let option of options) {
                const $option = document.createElement('option');
                $option.value = option;
                $option.textContent = option;
                $select.appendChild($option);
            }
        }
    }

    parent.appendChild($select);

    return {
        initValue(value) {
            $select.focus();
            $select.value = value || '';
        },
        getValue() {
            return $select.value;
        },
        setValue(value) {
            $select.value = value;
        }
    };
};

