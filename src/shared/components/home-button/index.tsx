import "./button.css";

interface ButtonProps {
  // data: string[];
  label: string[];
}

export default function Button({ label }: ButtonProps) {
  return (
    <div className="flex gap-4">
      <button className="btn-101">
        {label}

  
        <svg>
          <defs>
            <filter id="glow">
              <feGaussianBlur result="coloredBlur" stdDeviation="5" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="0" y="0" width="100%" height="100%" />
        </svg>
      </button>
    </div>
  );
}
