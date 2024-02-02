export default function RegisterButton({ onClicked }: { onClicked: () => void }){
    return (
        <button onClick={() => onClicked()} className={`w-1/2 h-10 bg-button-green rounded p-2 text-slate-100`}>
            <span className={`font-mono`}>Sign up</span>
        </button>
    );
}
