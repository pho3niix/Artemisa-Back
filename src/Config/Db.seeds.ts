import States from './Seeds/States.seeds';

export default (async () => {
    /**@States_seeds */
    await States();

    console.log('Seeds completed.');
    return process.exit(0)
})()