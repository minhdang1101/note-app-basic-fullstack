export const emailIsValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const passwordIsValid = (password) => {
    // Password must be at least 8 characters long and contain at least one number and one special character
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
};

export const confirmPasswordIsValid = (password, confirmPassword) => {
    return password === confirmPassword;
};

export const getInitials = (name) => {
    if (!name) return '';
    const namesArray = name.trim().split(" ");
    let words ="";
    for (let i = 0; i < Math.min(2, namesArray.length); i++) {
        words += namesArray[i].charAt(0).toUpperCase();
    }
    return words;
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};