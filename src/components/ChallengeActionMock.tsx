import {
  Droplets,
  Scan,
  CloudRain,
  TrendingUp,
  FlaskConical,
  Calendar,
  Thermometer,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Sun,
  CloudSun,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';

interface ChallengeActionMockProps {
  challengeId: string;
}

export function ChallengeActionMock({ challengeId }: ChallengeActionMockProps) {
  return (
    <div
      id="modal-ai-in-action-section"
      className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-xs"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/70">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#2C5F2D]/10 text-[#2C5F2D] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#2C5F2D]">
            See AI in Action
          </h3>
        </div>
        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-500 shadow-2xs">
          Simulated Field Demo
        </span>
      </div>

      {/* Visual Renderers depending on challengeId */}
      {challengeId === 'water-management' && <WaterManagementMock />}
      {challengeId === 'pest-attacks' && <PestAttacksMock />}
      {challengeId === 'crop-disease-detection' && <CropDiseaseMock />}
      {challengeId === 'weather-uncertainty' && <WeatherUncertaintyMock />}
      {challengeId === 'market-price' && <MarketPriceMock />}
      {challengeId === 'fertilizer-management' && <FertilizerMock />}
      {challengeId === 'labour-shortage' && <LabourShortageMock />}
      {challengeId === 'post-harvest-loss' && <PostHarvestLossMock />}
    </div>
  );
}

// 1. Water Management Mock: 4 Field Zones with moisture and AI recommendation
function WaterManagementMock() {
  const zones = [
    { name: 'Zone 1 (Wheat)', moisture: 58, status: 'fine', label: 'Optimal' },
    { name: 'Zone 2 (Corn)', moisture: 32, status: 'amber', label: 'Needs Water' },
    { name: 'Zone 3 (Pulses)', moisture: 64, status: 'fine', label: 'Optimal' },
    { name: 'Zone 4 (Paddy)', moisture: 19, status: 'red', label: 'Urgent' },
  ];

  return (
    <div id="mock-water-management" className="space-y-3.5">
      <div className="text-xs font-semibold text-slate-600 flex items-center justify-between">
        <span>Field Soil Moisture Heatmap</span>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#2C5F2D]" /> Fine
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#C1610B]" /> Needs Water
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500" /> Urgent
          </span>
        </div>
      </div>

      {/* Grid of 4 Zones */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {zones.map((zone) => {
          const isAmber = zone.status === 'amber';
          const isRed = zone.status === 'red';

          const bgClass = isRed
            ? 'bg-red-50 border-red-200 text-red-700'
            : isAmber
            ? 'bg-amber-50 border-amber-300 text-amber-800 ring-2 ring-amber-400/40'
            : 'bg-emerald-50 border-emerald-200 text-emerald-800';

          const barColor = isRed ? 'bg-red-500' : isAmber ? 'bg-[#C1610B]' : 'bg-[#2C5F2D]';

          return (
            <div
              key={zone.name}
              className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${bgClass}`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                <span>{zone.name}</span>
                {isAmber && <span className="text-[10px] uppercase font-mono px-1 rounded bg-amber-200/80 text-amber-900">Target</span>}
              </div>
              <div className="my-1.5">
                <div className="text-lg font-black">{zone.moisture}%</div>
                <div className="w-full bg-slate-200/70 rounded-full h-1.5 overflow-hidden mt-1">
                  <div className={`h-full rounded-full ${barColor}`} style={{ width: `${zone.moisture}%` }} />
                </div>
              </div>
              <span className="text-[10px] font-semibold mt-1 opacity-90">{zone.label}</span>
            </div>
          );
        })}
      </div>

      {/* Recommendation Banner */}
      <div className="p-3 rounded-xl bg-white border border-amber-200/90 flex items-start gap-2.5 shadow-2xs">
        <Droplets className="w-4 h-4 text-[#C1610B] mt-0.5 shrink-0" />
        <div className="text-xs text-slate-700 leading-snug">
          <span className="font-bold text-slate-900">Soil Moisture: 32%</span> →{' '}
          <span className="text-[#C1610B] font-bold">AI Recommendation:</span> Irrigate Zone 2 for 20 mins today. Automated solenoid valve scheduled at 06:00 PM.
        </div>
      </div>
    </div>
  );
}

// 2. Pest & Insect Attacks Mock: Leaf scan with bounding box detection
function PestAttacksMock() {
  return (
    <div id="mock-pest-attacks" className="space-y-3.5">
      {/* CSS-built leaf scanner mockup */}
      <div className="relative h-44 rounded-xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-950 p-4 overflow-hidden flex items-center justify-center border border-emerald-700/60 shadow-inner">
        {/* Leaf stylized silhouette pattern */}
        <div className="w-64 h-32 rounded-[100px_10px_100px_10px] bg-gradient-to-r from-emerald-600/50 to-lime-600/40 border border-emerald-400/30 rotate-12 flex items-center justify-center relative">
          <div className="w-full h-0.5 bg-emerald-300/30 rotate-12" />
        </div>

        {/* AI Bounding Box targeting pest */}
        <div className="absolute top-8 left-1/3 w-36 h-28 border-2 border-amber-400 bg-amber-400/10 rounded-lg backdrop-blur-2xs shadow-lg animate-pulse">
          {/* Corner crosshairs */}
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-amber-300" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-300" />
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-amber-300" />
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-300" />

          {/* AI Tag */}
          <div className="absolute -top-6 left-0 bg-[#C1610B] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
            <Scan className="w-3 h-3" />
            <span>Pest: Aphid Colony (92%)</span>
          </div>

          {/* Target marker */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-amber-400/80 ring-4 ring-amber-400/30" />
          </div>
        </div>

        {/* Camera HUD overlay */}
        <div className="absolute bottom-2 left-3 text-[10px] font-mono text-emerald-200/80">
          RGB Scan • Resolution 1080p • YOLOv8-Agri
        </div>
        <div className="absolute top-2 right-3 text-[10px] font-mono text-amber-300 bg-black/40 px-2 py-0.5 rounded">
          ● AI Live Detection
        </div>
      </div>

      {/* Result Banner */}
      <div className="p-3 rounded-xl bg-white border border-amber-200/90 flex items-start gap-2.5 shadow-2xs">
        <AlertTriangle className="w-4 h-4 text-[#C1610B] mt-0.5 shrink-0" />
        <div className="text-xs text-slate-700 leading-snug">
          <span className="font-bold text-slate-900">Pest Detected: Aphids</span> —{' '}
          <span className="font-semibold text-emerald-700">Confidence 92%</span> →{' '}
          <span className="text-[#C1610B] font-bold">Recommended Action:</span> Apply neem spray within 2 days to prevent canopy spread.
        </div>
      </div>
    </div>
  );
}

// 3. Crop Disease Detection Mock: Uploaded leaf vs AI Diagnosis
function CropDiseaseMock() {
  return (
    <div id="mock-disease-detection" className="space-y-3.5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Left: Uploaded Leaf */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
            <span>1. Uploaded Leaf Photo</span>
            <span className="text-[10px] text-slate-400 font-mono">IMG_4821.JPG</span>
          </div>
          <div className="h-28 rounded-lg bg-gradient-to-tr from-lime-800 to-emerald-700 relative overflow-hidden flex items-center justify-center border border-slate-200">
            {/* Visual leaf with brown spot lesions */}
            <div className="w-28 h-20 rounded-[40px_10px_40px_10px] bg-emerald-600 rotate-6 relative flex items-center justify-center shadow-inner">
              <div className="w-3 h-3 rounded-full bg-amber-900/80 absolute top-4 left-6" />
              <div className="w-4 h-4 rounded-full bg-amber-950/90 absolute bottom-5 right-7 ring-2 ring-amber-800/40" />
            </div>
            <div className="absolute bottom-1.5 left-2 bg-black/50 text-[10px] text-white px-1.5 py-0.5 rounded">
              Raw Leaf Sample
            </div>
          </div>
          <span className="text-[11px] text-slate-500 mt-2">Tomato plant specimen #4</span>
        </div>

        {/* Right: AI Diagnosis Heatmap */}
        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-[#2C5F2D] mb-2">
            <span>2. AI Neural Diagnosis</span>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
              87% Confidence
            </span>
          </div>
          <div className="h-28 rounded-lg bg-slate-900 relative overflow-hidden flex flex-col items-center justify-center p-3 text-center">
            <div className="text-amber-400 font-extrabold text-sm sm:text-base flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              <span>Early Blight</span>
            </div>
            <div className="text-[11px] text-slate-300 font-mono mt-1">
              Pathogen: Alternaria solani
            </div>
            <div className="text-[10px] text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-full mt-2 font-semibold">
              Severity: Grade 2 (Treat within 3 days)
            </div>
          </div>
          <span className="text-[11px] text-slate-600 mt-2 font-medium">Deep-learning leaf scan verified</span>
        </div>
      </div>

      {/* Action Banner */}
      <div className="p-3 rounded-xl bg-white border border-emerald-200 flex items-start gap-2.5 shadow-2xs">
        <CheckCircle2 className="w-4 h-4 text-[#2C5F2D] mt-0.5 shrink-0" />
        <div className="text-xs text-slate-700 leading-snug">
          <span className="font-bold text-slate-900">AI Diagnosis: Early Blight (87% confidence)</span> →{' '}
          <span className="text-[#2C5F2D] font-bold">Recommended Treatment:</span> Spray copper fungicide solution within 3 days; isolate affected rows to prevent spore transmission.
        </div>
      </div>
    </div>
  );
}

// 4. Weather Uncertainty Mock: 5-Day forecast strip with heavy rain alert
function WeatherUncertaintyMock() {
  const forecast = [
    { day: 'Mon', icon: Sun, temp: '31°', cond: 'Clear', alert: false },
    { day: 'Tue', icon: CloudSun, temp: '29°', cond: 'Cloudy', alert: false },
    { day: 'Wed', icon: CloudRain, temp: '23°', cond: 'Heavy Rain', alert: true },
    { day: 'Thu', icon: CloudRain, temp: '25°', cond: 'Scattered', alert: false },
    { day: 'Fri', icon: Sun, temp: '28°', cond: 'Sunny', alert: false },
  ];

  return (
    <div id="mock-weather-uncertainty" className="space-y-3.5">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
        <span>Hyperlocal 5-Day Microclimate Forecast</span>
        <span className="text-[11px] text-emerald-700 font-bold">Accuracy: 94.8%</span>
      </div>

      {/* 5-day cards */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {forecast.map((f) => {
          const IconComponent = f.icon;
          return (
            <div
              key={f.day}
              className={`p-2.5 rounded-xl border text-center flex flex-col items-center justify-between transition-all ${
                f.alert
                  ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400 text-amber-900'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <span className="text-[11px] font-bold uppercase">{f.day}</span>
              <IconComponent
                className={`w-5 h-5 my-1.5 ${f.alert ? 'text-[#C1610B]' : 'text-slate-500'}`}
              />
              <span className="text-sm font-extrabold">{f.temp}</span>
              <span className="text-[10px] font-medium truncate w-full">{f.cond}</span>
              {f.alert && (
                <span className="mt-1 text-[9px] font-bold bg-[#C1610B] text-white px-1 rounded-sm uppercase">
                  Alert
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* AI Alert Banner */}
      <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-2.5 shadow-2xs">
        <CloudRain className="w-4 h-4 text-[#C1610B] mt-0.5 shrink-0" />
        <div className="text-xs text-amber-950 leading-snug">
          <span className="font-extrabold text-[#C1610B]">AI Climate Alert:</span> Heavy rain expected in 2 days (Wed, 48mm predicted).{' '}
          <span className="font-bold underline">Delay fertilizer application</span> to prevent nutrient run-off and erosion loss.
        </div>
      </div>
    </div>
  );
}

// 5. Market Price / Selling Problem Mock: 7-day price forecast chart with Thursday peak
function MarketPriceMock() {
  const prices = [
    { day: 'Mon', price: 2100, height: 40, isPeak: false },
    { day: 'Tue', price: 2150, height: 48, isPeak: false },
    { day: 'Wed', price: 2240, height: 62, isPeak: false },
    { day: 'Thu', price: 2420, height: 95, isPeak: true },
    { day: 'Fri', price: 2280, height: 68, isPeak: false },
    { day: 'Sat', price: 2210, height: 56, isPeak: false },
    { day: 'Sun', price: 2180, height: 50, isPeak: false },
  ];

  return (
    <div id="mock-market-price" className="space-y-3.5">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
        <span>7-Day Mandi Price Prediction (Wheat / Quintal)</span>
        <span className="text-[11px] font-bold text-[#C1610B] flex items-center gap-0.5">
          <TrendingUp className="w-3.5 h-3.5" /> Projected +8.2%
        </span>
      </div>

      {/* CSS-built Bar/Line Chart */}
      <div className="p-4 rounded-xl bg-white border border-slate-200">
        <div className="h-32 flex items-end justify-between gap-2 pt-6 pb-1 border-b border-slate-100">
          {prices.map((p) => (
            <div key={p.day} className="flex-1 flex flex-col items-center h-full justify-end group">
              {p.isPeak && (
                <div className="mb-1 bg-[#C1610B] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs whitespace-nowrap animate-bounce">
                  Best Day: ₹{p.price}
                </div>
              )}
              <div
                className={`w-full rounded-t-lg transition-all ${
                  p.isPeak
                    ? 'bg-gradient-to-t from-[#C1610B] to-amber-400 ring-2 ring-amber-300'
                    : 'bg-emerald-100 group-hover:bg-emerald-200'
                }`}
                style={{ height: `${p.height}%` }}
              />
            </div>
          ))}
        </div>

        {/* Day Labels */}
        <div className="flex justify-between text-[11px] font-semibold text-slate-500 pt-2">
          {prices.map((p) => (
            <span
              key={p.day}
              className={`flex-1 text-center ${p.isPeak ? 'text-[#C1610B] font-extrabold' : ''}`}
            >
              {p.day}
            </span>
          ))}
        </div>
      </div>

      {/* AI Recommendation Banner */}
      <div className="p-3 rounded-xl bg-white border border-amber-200 flex items-start gap-2.5 shadow-2xs">
        <ArrowUpRight className="w-4 h-4 text-[#C1610B] mt-0.5 shrink-0" />
        <div className="text-xs text-slate-700 leading-snug">
          <span className="font-bold text-slate-900">AI Recommendation:</span> Sell on{' '}
          <span className="font-extrabold text-[#C1610B]">Thursday for ~8% higher price</span> (₹2,420/qtl peak). High wholesale procurement demand forecasted in regional Mandis.
        </div>
      </div>
    </div>
  );
}

// 6. Fertilizer Management Mock: N-P-K Bar Levels with recommendation
function FertilizerMock() {
  const nutrients = [
    { name: 'Nitrogen (N)', current: 28, target: '60-80', status: 'low', barColor: 'bg-amber-500', label: 'Low (28 ppm)' },
    { name: 'Phosphorus (P)', current: 68, target: '50-70', status: 'optimal', barColor: 'bg-[#2C5F2D]', label: 'Optimal (68 ppm)' },
    { name: 'Potassium (K)', current: 74, target: '60-80', status: 'optimal', barColor: 'bg-[#2C5F2D]', label: 'Optimal (74 ppm)' },
  ];

  return (
    <div id="mock-fertilizer" className="space-y-3.5">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
        <span>Soil N-P-K Spectral Analysis</span>
        <span className="text-[11px] font-mono font-bold text-slate-500">Plot 3A • Sandy Loam</span>
      </div>

      {/* Report Card */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
        {nutrients.map((n) => (
          <div key={n.name} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">{n.name}</span>
              <span
                className={`font-semibold text-[11px] ${
                  n.status === 'low' ? 'text-[#C1610B] font-bold' : 'text-[#2C5F2D]'
                }`}
              >
                {n.label}
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full ${n.barColor}`}
                style={{ width: `${n.current}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* AI Recommendation */}
      <div className="p-3 rounded-xl bg-white border border-amber-200/90 flex items-start gap-2.5 shadow-2xs">
        <FlaskConical className="w-4 h-4 text-[#C1610B] mt-0.5 shrink-0" />
        <div className="text-xs text-slate-700 leading-snug">
          <span className="font-bold text-[#C1610B]">Nitrogen low (28 ppm)</span> →{' '}
          <span className="font-bold text-slate-900">AI Recommendation:</span> Apply 20kg Urea per acre before the 4th tiller vegetative stage. Phosphorus &amp; Potassium levels are balanced.
        </div>
      </div>
    </div>
  );
}

// 7. Labour Shortage Mock: Week calendar with High Labour Demand window
function LabourShortageMock() {
  const weekDays = [
    { day: 'Mon', date: 'Oct 12', demand: 'high', workers: 4 },
    { day: 'Tue', date: 'Oct 13', demand: 'high', workers: 4 },
    { day: 'Wed', date: 'Oct 14', demand: 'high', workers: 3 },
    { day: 'Thu', date: 'Oct 15', demand: 'normal', workers: 1 },
    { day: 'Fri', date: 'Oct 16', demand: 'normal', workers: 1 },
    { day: 'Sat', date: 'Oct 17', demand: 'low', workers: 0 },
    { day: 'Sun', date: 'Oct 18', demand: 'low', workers: 0 },
  ];

  return (
    <div id="mock-labour-shortage" className="space-y-3.5">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
        <span>AI Harvest Labour Forecasting</span>
        <span className="text-[11px] font-bold text-[#C1610B]">Peak Demand Ahead</span>
      </div>

      {/* Week Calendar Strip */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {weekDays.map((d) => {
          const isHigh = d.demand === 'high';
          return (
            <div
              key={d.day}
              className={`p-2 rounded-xl border text-center flex flex-col justify-between transition-all ${
                isHigh
                  ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400 text-amber-950'
                  : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              <span className="text-[10px] font-bold uppercase">{d.day}</span>
              <span className="text-[11px] text-slate-400 font-mono my-0.5">{d.date.split(' ')[1]}</span>
              <div className="my-1">
                <span
                  className={`text-xs font-black block ${
                    isHigh ? 'text-[#C1610B]' : 'text-slate-700'
                  }`}
                >
                  {d.workers > 0 ? `${d.workers} W` : '-'}
                </span>
              </div>
              <span
                className={`text-[9px] font-semibold uppercase px-1 py-0.5 rounded ${
                  isHigh ? 'bg-[#C1610B] text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {isHigh ? 'Peak' : 'Norm'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Tip Banner */}
      <div className="p-3 rounded-xl bg-white border border-amber-200 flex items-start gap-2.5 shadow-2xs">
        <Calendar className="w-4 h-4 text-[#C1610B] mt-0.5 shrink-0" />
        <div className="text-xs text-slate-700 leading-snug">
          <span className="font-bold text-[#C1610B]">High Labour Demand Window:</span> AI suggests{' '}
          <span className="font-bold text-slate-900">booking 4 workers for Mon–Wed harvest window</span>. Nearby farmworker matching network has 6 verified labourers available.
        </div>
      </div>
    </div>
  );
}

// 8. Post-Harvest Loss Mock: Storage gauge with humidity warning
function PostHarvestLossMock() {
  return (
    <div id="mock-post-harvest" className="space-y-3.5">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
        <span>Silo / Granary Storage Telemetry</span>
        <span className="text-[11px] font-mono text-slate-500">Sensor Unit: WAREHOUSE-B2</span>
      </div>

      {/* Dual Gauges: Temperature & Humidity */}
      <div className="grid grid-cols-2 gap-3">
        {/* Temp Gauge */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-center flex flex-col justify-between">
          <span className="text-xs font-bold text-slate-700 flex items-center justify-center gap-1">
            <Thermometer className="w-3.5 h-3.5 text-[#2C5F2D]" /> Temperature
          </span>
          <div className="my-2">
            <div className="text-2xl font-black text-[#2C5F2D]">21.5°C</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Optimal Range (18–24°C)</div>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-[#2C5F2D] h-full rounded-full" style={{ width: '45%' }} />
          </div>
        </div>

        {/* Humidity Gauge (Warning State) */}
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-center flex flex-col justify-between ring-2 ring-amber-400/40">
          <span className="text-xs font-bold text-amber-900 flex items-center justify-center gap-1">
            <Droplets className="w-3.5 h-3.5 text-[#C1610B]" /> Relative Humidity
          </span>
          <div className="my-2">
            <div className="text-2xl font-black text-[#C1610B]">84.2%</div>
            <div className="text-[10px] text-[#C1610B] font-bold mt-0.5">Unsafe Limit (&gt;75%)</div>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-[#C1610B] h-full rounded-full" style={{ width: '84%' }} />
          </div>
        </div>
      </div>

      {/* Warning Alert Banner */}
      <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-2.5 shadow-2xs">
        <AlertTriangle className="w-4 h-4 text-[#C1610B] mt-0.5 shrink-0" />
        <div className="text-xs text-amber-950 leading-snug">
          <span className="font-extrabold text-[#C1610B]">Humidity Rising Alert:</span> AI predicts{' '}
          <span className="font-bold underline">spoilage risk in 48 hrs</span> due to condensation buildup. Activate ventilation dehumidifiers or move grains to cold storage immediately.
        </div>
      </div>
    </div>
  );
}
