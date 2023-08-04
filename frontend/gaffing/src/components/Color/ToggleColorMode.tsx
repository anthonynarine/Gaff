

type ToggleColorModeProps = {
    children: React.ReactNode
    
}


const ToggleColorMode: React.FC<ToggleColorModeProps> = ({children}) =>{

    const [mode, setMode] = useState<"light" | "dark">;

};

export default ToggleColorMode;

