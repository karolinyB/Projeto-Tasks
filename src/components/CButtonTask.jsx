function ButtonTask(props) {
    return (
        <button
            className="text-zinc-800 text-left bg-violet-300 p-2 rounded-md shadow w-full"
            {...props}
        >
            {props.children}
        </button>
    );
}

export default ButtonTask;