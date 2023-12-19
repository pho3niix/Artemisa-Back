import app from "./App";

/**Variable definitions */
const Port: number | string = process.env.NODE_PORT;
const ProjectName: string = process.env.PROJECT_NAME;

/**Server Execution */
const server = app.listen(Port, (): void => {
    console.log(
        `${ProjectName} Back-End Running on ${process.env.NODE_ENV} API on port ${Port} at ${new Date().toString()}`
    );
});

server.timeout = 10000;

export default server;