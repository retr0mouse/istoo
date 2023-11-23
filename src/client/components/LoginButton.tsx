export default function LoginButton({ onClicked }) {
    return (
        <div className="relative inset-0 flex items-center justify-center w-1/2 h-10">
            <button
                type="button"
                onClick={() => onClicked()}
                className="h-10 w-full"
            >
                <span className="font-mono">Log In</span>
            </button>
        </div>
    )
}