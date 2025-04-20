function ButtonOptions(props) {
    return (
        <button
            className="bg-green-200 p-2 rounded-md text-slate-950"
            {...props}
        >
            {props.children}
        </button>
    );
}

export default ButtonOptions;