import { MachineType, MachineInfo } from './types';

export const MACHINES: Record<MachineType, MachineInfo> = {
  [MachineType.LEVER]: {
    id: MachineType.LEVER,
    name: "الرافعة",
    scientificName: "Lever",
    description: "ساق صلبة تتحرك حول نقطة ثابتة تسمى نقطة الارتكاز.",
    physicsConcept: "تعتمد على قانون العزم: (القوة × ذراعها = المقاومة × ذراعها). تقسم إلى ثلاثة أنواع حسب موقع نقطة الارتكاز.",
    example: "العتلة، الميزان، كسارة البندق، الأرجوحة",
    imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800",
    color: "bg-blue-50 text-blue-800 border-blue-200"
  },
  [MachineType.WHEEL_AXLE]: {
    id: MachineType.WHEEL_AXLE,
    name: "العجلة والمحور",
    scientificName: "Wheel & Axle",
    description: "جسمان دائريان بقطرين مختلفين مثبتان معاً ويدوران حول نفس المحور.",
    physicsConcept: "تعمل كرافعة دوارة. الفائدة الآلية = نصف قطر العجلة ÷ نصف قطر المحور. تستخدم لنقل العزم وتضخيم القوة.",
    example: "مقود السيارة، مفك البراغي، مقبض الباب الدائري",
    imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800",
    color: "bg-purple-50 text-purple-800 border-purple-200"
  },
  [MachineType.PULLEY]: {
    id: MachineType.PULLEY,
    name: "البكرة",
    scientificName: "Pulley",
    description: "عجلة محيطها غائر يمر حوله حبل أو سلك لنقل الحركة.",
    physicsConcept: "البكرة الثابتة تغير اتجاه القوة (فائدة آلية = 1). نظام البكرات المتحركة يضاعف القوة ويقلل الجهد اللازم (فائدة آلية > 1).",
    example: "الرافعة في مواقع البناء، سارية العلم، المصاعد",
    imageUrl: "https://images.unsplash.com/photo-1523820429589-52f008259f0a?auto=format&fit=crop&q=80&w=800",
    color: "bg-orange-50 text-orange-800 border-orange-200"
  },
  [MachineType.INCLINED_PLANE]: {
    id: MachineType.INCLINED_PLANE,
    name: "السطح المائل",
    scientificName: "Inclined Plane",
    description: "سطح يميل بزاوية معينة عن السطح الأفقي يربط بين مستويين مختلفي الارتفاع.",
    physicsConcept: "يقلل القوة اللازمة لرفع الجسم بزيادة المسافة. الفائدة الآلية = طول السطح ÷ ارتفاع السطح.",
    example: "منحدرات التحميل، السلالم، الطرق الجبلية المتعرجة",
    imageUrl: "https://images.unsplash.com/photo-1621252179027-94459d27d3ee?auto=format&fit=crop&q=80&w=800",
    color: "bg-green-50 text-green-800 border-green-200"
  },
  [MachineType.WEDGE]: {
    id: MachineType.WEDGE,
    name: "الإسفين",
    scientificName: "Wedge",
    description: "آلة بسيطة تتكون من سطحين مائلين متقابلين (متحرك).",
    physicsConcept: "يحول القوة العمودية المؤثرة على قاعدته إلى قوتين جانبيتين كبيرتين جداً تستخدمان للفصل أو القطع.",
    example: "الفأس، السكين، الأسنان، الإزميل",
    imageUrl: "https://images.unsplash.com/photo-1586863373257-22f564627e52?auto=format&fit=crop&q=80&w=800",
    color: "bg-red-50 text-red-800 border-red-200"
  },
  [MachineType.SCREW]: {
    id: MachineType.SCREW,
    name: "البرغي",
    scientificName: "Screw",
    description: "سطح مائل ملفوف بشكل لولبي حول أسطوانة.",
    physicsConcept: "يحول الحركة الدورانية (عزم الدوران) إلى حركة خطية قوية. المسافة بين كل سن وآخر تسمى 'الخطوة'.",
    example: "البراغي، غطاء الزجاجة، المكبس اللولبي (الجاك)",
    imageUrl: "https://images.unsplash.com/photo-1535136846724-38089df179d5?auto=format&fit=crop&q=80&w=800",
    color: "bg-yellow-50 text-yellow-800 border-yellow-200"
  }
};

export const FALLBACK_SCENARIOS: any[] = [
  {
    scenario: "في موقع بناء، يريد المهندس رفع كتلة خرسانية ثقيلة جداً إلى الطابق الثاني بأقل قوة ممكنة باستخدام حبل وعجلات معلقة.",
    correctMachine: MachineType.PULLEY,
    explanation: "النظام المستخدم هو البكرة المركبة، حيث تساعد في تقليل القوة اللازمة لرفع الأحمال الثقيلة."
  },
  {
    scenario: "لدينا برميل ثقيل نريد إيصاله لظهر شاحنة مرتفعة. بدلاً من رفعه عمودياً بصعوبة، قمنا بدحرجته عبر لوح خشبي طويل.",
    correctMachine: MachineType.INCLINED_PLANE,
    explanation: "اللوح الخشبي يمثل سطحاً مائلاً، مما يزيد مسافة الحركة ولكنه يقلل القوة المطلوبة بشكل كبير."
  }
];