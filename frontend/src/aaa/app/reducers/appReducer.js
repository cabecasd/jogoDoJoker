
const appState = (appPage = 0, action) => {
    if (action.type === "COMECAR") {
        return appPage + 1;
    }
    return appPage
}

export default appState