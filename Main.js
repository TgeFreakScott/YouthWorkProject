function main()
{
    const game = new Game();
    game.update();

    //uses the mouse click trigger the next scene
    document.addEventListener("click", nextScene.bind(null,game.sceneManager));
}

function nextScene(sceneManager, e)
{
    sceneManager.goToNextScene();
    sceneManager.updateCurrentScene();
    sceneManager.renderCurrentScene();
}
