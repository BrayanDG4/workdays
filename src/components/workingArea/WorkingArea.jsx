import { ToolBar } from "./ToolBar";
import { WorkingHours } from "./WorkingHours";

export const WorkingArea = () => {
  return (
    <>
      <ToolBar />
      <section className="h-full w-full">
        <div className="h-screen">
          <div className="container mx-auto px-2 pt-8">
            {/* section info */}
            <div className="mb-1">
              <h2 className="text-4xl font-bold gray-text mb-2">Actividades</h2>
              {/* Selected counter */}
              <div className="text-2xl gray-text-2 font-bold">
                <p>0 seleccionados</p>
              </div>
              {/*end Selected counter */}
            </div>
            <WorkingHours />
          </div>
        </div>
      </section>
    </>
  );
};
