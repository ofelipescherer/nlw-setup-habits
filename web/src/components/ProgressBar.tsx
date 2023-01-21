import * as Progress from '@radix-ui/react-progress';

type ProgressBarProps = {
  progress: number;
};

export function ProgressBar(props: ProgressBarProps) {
  return (
    <>
      {/* Barra de progresso acessível */}
      {/* <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
            <div
              role="progressbar"
              aria-label="Progresso de hábitos completados nesse dia"
              aria-value={75}
              className="h-3 rounded-xl bg-violet-600 w-3/4"
            ></div>
          </div> */}

      {/* Usando o Radix para fazer uma barra de progresso acessível também */}
      <Progress.Root className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
        <Progress.Indicator
          className="h-3 rounded-xl bg-violet-600 transition-all"
          style={{ width: `${props.progress}%` }}
        ></Progress.Indicator>
      </Progress.Root>
    </>
  );
}
