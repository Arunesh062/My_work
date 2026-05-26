export default function SimpleWeightChart() {
  return (
    <div className="bg-zinc-900 p-6 rounded-2xl text-white">
      <h2 className="text-2xl font-bold mb-4">
        Weight Progress
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Mon</span>
          <span>55 kg</span>
        </div>

        <div className="flex justify-between">
          <span>Tue</span>
          <span>55.2 kg</span>
        </div>

        <div className="flex justify-between">
          <span>Wed</span>
          <span>55.5 kg</span>
        </div>

        <div className="flex justify-between">
          <span>Thu</span>
          <span>55.8 kg</span>
        </div>

        <div className="flex justify-between">
          <span>Fri</span>
          <span>56 kg</span>
        </div>
      </div>
    </div>
  );
}
