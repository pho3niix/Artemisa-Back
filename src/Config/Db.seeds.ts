import States from './Seeds/States.seeds';
import Plans from './Seeds/Plans.seed';

export default (async () => {
    /**@States_seeds */
    await States();

    /**@Plans */
    await Plans();

    console.log('Seeds completed.');
    return process.exit(0)
})()