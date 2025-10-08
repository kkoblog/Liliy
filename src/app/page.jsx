"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

// セクションヘッダーのコンポーネント化
const SectionHeader = ({ title, subtitle }) => (
  <div className="relative mb-8 md:mb-12 px-4">
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-black">
      <span className="relative inline-block pb-4">
        {title}
        <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#D4AF37]"></span>
      </span>
    </h2>
    {subtitle && (
      <p className="mt-6 text-sm md:text-lg lg:text-xl text-gray-600 text-center">
        {subtitle}
      </p>
    )}
  </div>
);

// もしくは別のデザインバージョン
const SectionHeader2 = ({ title, subtitle }) => (
  <div className="relative mb-12 md:mb-16 px-4">
    <h2 className="relative inline-block text-2xl md:text-3xl lg:text-4xl font-bold text-center w-full">
      <span className="relative z-10">{title}</span>
      <span className="absolute left-0 bottom-1 w-full h-3 bg-[#D4AF37]/30 -rotate-1 z-0"></span>
    </h2>
    {subtitle && (
      <p className="mt-6 text-sm md:text-base text-gray-600 text-center">
        {subtitle}
      </p>
    )}
  </div>
);

// カラーパレットの定義
const colors = {
  primary: {
    bg: 'bg-white',          // 背景を白に変更
    text: 'text-[#4a4a4a]',  // ダークグレー
    accent: 'bg-[#D4AF37]',  // ゴールド
  },
  secondary: {
    light: 'bg-white',       // 背景を白に変更
    border: 'border-[#D4AF37]', // ゴールド
    hover: 'hover:bg-[#D4AF37]/10', // ホバー時のゴールド（薄め）
  }
};

// Instagramの埋め込みを最適化
const InstagramEmbed = ({ url }) => {
  return (
    <div className="w-full aspect-[9/16] max-w-[280px] mx-auto">
      <iframe 
        src={url}
        className="w-full h-full"
        frameBorder="0" 
        scrolling="no" 
        allowtransparency="true"
      />
    </div>
  );
};

// スタッフカードコンポーネントの作成
const StaffCard = ({ image, name, position, message }) => {
  return (
    <div className="bg-[#f5f5f5] p-4 md:p-8 rounded-xl shadow-sm">
      <div className="bg-white/80 p-6 rounded-xl shadow-sm h-full flex flex-col">
        <div className="flex items-center space-x-2 mb-4">
          <i className="fas fa-quote-left text-[#D4AF37] text-xl"></i>
          <span className="text-[#D4AF37] font-medium"></span>
        </div>
        
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 md:w-28 md:h-28 overflow-hidden rounded-full border-4 border-white shadow-md mr-4 flex-shrink-0">
            <Image
              src={image}
              alt={`スタッフ${name}`}
              width={128}
              height={128}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <p className="font-bold text-lg">{name}</p>
            <p className="text-sm text-gray-600">{position}</p>
          </div>
        </div>
        
        <div className="space-y-4 mb-6">
          <p className="text-gray-700">
            {message}
          </p>
          
          {name === "kaoru" ? (
            <>
              <p className="text-gray-700">
                でも<span className="font-bold text-[#D4AF37]">Liliyでは</span>、
                <span className="bg-[#D4AF37]/10 px-2 py-1 rounded inline-block mt-1">
                  長年の経験を活かし、半年でカラーリストからメンズカットまでデビューできました。
                  無理なく入客できる環境が心強いです。
                </span>
              </p>
              
              <p className="text-gray-700">
                50歳を超えて身体的な不安もある中、
                <span className="border-b-2 border-[#D4AF37]">
                  休みの設定も柔軟で、子供との時間もしっかり確保できるため、仕事も子育ても充実しています！
                </span>
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-700">
                でも<span className="font-bold text-[#D4AF37]">Liliyに入社して</span>、
                <span className="bg-[#D4AF37]/10 px-2 py-1 rounded inline-block mt-1">
                  オーナーをはじめ、チーフなどスタッフ全員の協力のもと、無理なく一歩ずつスキルアップができています。
                  前職では外部講習の費用負担もあり、パートとの両立が厳しく夫からも心配されていましたが...
                </span>
              </p>
              
              <p className="text-gray-700">
                今では、
                <span className="border-b-2 border-[#D4AF37]">
                  予約状況に応じて早上がりも可能で、家事にもしっかり時間を使えるようになりました。
                  仕事と家庭のバランスが取れ、心に余裕が生まれています。
                </span>
              </p>
              
              <p className="text-gray-700">
                <span className="bg-[#D4AF37]/10 px-2 py-1 rounded inline-block mt-1">
                  技術面でも着実に成長を実感でき、毎日が楽しく充実しています。
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};


// スライドショーコンポーネントを追加
const ImageSlideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    {
      src: "/image/new1.jpeg",
      alt: "サロン外観"
    },
    {
      src: "/image/new2.jpeg",
      alt: "店内の様子"
    },
    {
      src: "/image/new3.jpeg",
      alt: "施術スペース"
    },
    {
      src: "/image/new4.jpeg",
      alt: "リラックススペース"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full aspect-[1/1] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[1/1] overflow-hidden rounded-lg shadow-lg">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-all duration-1000 ${
            currentImageIndex === index 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-full'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 100vw,
                   (max-width: 768px) 80vw,
                   (max-width: 1024px) 70vw,
                   60vw"
            className="object-cover object-center"
            priority={index === 0}
            quality={85}
          />
        </div>
      ))}
      
      {/* インジケーター */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentImageIndex === index ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

function MainComponent() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 各セクションのIntersectionObserverを設定
  const [conceptRef, conceptInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });
  const [staffRef, staffInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });
  const [requirementsRef, requirementsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });
  const [qaRef, qaInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });
  const [ownerRef, ownerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });

  // スクロール位置を監視して、ボタンの表示/非表示を制御
  useEffect(() => {
    const handleScroll = () => {
      // 100px以上スクロールしたらボタンを表示
      setShowScrollTop(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // トップへスクロール
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 悩みセクションの各項目用のIntersectionObserver
  const concerns = [
    <>
      <span className="border-b-2 border-gray-200 inline-block mb-4">「子供が産まれて夜遅くまで働けなくて…」<br /></span>
      家から近い場所で働きたいけど、環境が変わるのが不安だな。
    </>,
    <>
      <span className="border-b-2 border-gray-200 inline-block mb-4">「子供の学校行事も大切にしたい」<br /></span>
      日曜日は絶対に休みが欲しい。急な発熱でも気兼ねなく休める環境って、見つかるかな…。
    </>,
    <>
      <span className="border-b-2 border-gray-200 inline-block mb-4">「今までの経験を活かせる場所で働きたい」<br /></span>
      自分の意見も聞いてもらえて、家庭との両立もできる…そんな理想の環境、本当にあるのかな。
    </>,
  ];

  const concernRefs = concerns.map(() => useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  }));

  // アニメーション用のIntersectionObserver設定を確認
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1, // より早くトリガーされるように閾値を下げる
    rootMargin: '-50px'
  });

  // アニメーションクラスの定義を確認
  const fadeInUpClass = 'transition-all duration-1000 ease-out';
  const fadeInUpAnimation = (inView) => 
    `${fadeInUpClass} ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`;

  // 特徴セクション用のIntersectionObserver設定を追加
  const { ref: featuresRef, inView: featuresInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px'
  });

  const RequirementSection = () => {
    const requirements = [
      {
        main: "週1日からでもOK！土日はゆっくり休みたい方",
        sub: "土日休みOK、17時までの勤務で保育園のお迎えも安心。急な行事や体調不良でも気兼ねなく休めます"
      },
      {
        main: "30代～60代の方が活躍中！",
        sub: "実際に小学生と未就学児のママさんが8年間活躍中。ライフステージに合わせて正社員登用も可能です"
      },
      {
        main: "お客様との会話を楽しめる、明るい方",
        sub: "マニュアル化された接客は一切なし。あなたらしい接客で、サロンを一緒に作りましょう"
      },
      {
        main: "チームワークを大切にできる方",
        sub: "「この薬剤を使いたい」などの提案も積極採用。スタッフの意見を活かしながら、みんなで理想のサロンを作っています"
      }
    ];

    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.2,
      rootMargin: '-50px'
    });

    return (
      <section className="py-16 md:py-24 bg-white">
        <SectionHeader 
          title="求める人材"
          subtitle="私たちと一緒に働きませんか？"
        />
        
        <div className="max-w-6xl mx-auto px-4">
          <div 
            ref={ref}
            className={`space-y-6 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {requirements.map((req, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
                      <span className="text-[#D4AF37] text-sm font-medium">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 w-full">
                    <p className="text-base md:text-lg font-bold text-black">
                      {req.main}
                    </p>
                    <p className="text-sm md:text-base text-gray-600">
                      {req.sub}
                    </p>
                    {req.images && (
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {req.images.map((img, imgIndex) => (
                          <div key={imgIndex} className="space-y-2">
                            <div className="relative aspect-video">
                              <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                            <p className="text-sm text-gray-600 text-center font-medium">
                              {img.caption}
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {img.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-12">
            <a 
              href="https://lin.ee/oR5vEoA" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#e24a4a] text-white px-6 py-3 rounded-full hover:bg-[#bd3535] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0"
            >
              応募する
            </a>
          </div>
        </div>
      </section>
    );
  };

  // 悩みセクション用のIntersectionObserver設定を調整
  const { ref: concernsRef, inView: concernsInView } = useInView({
    triggerOnce: true,
    threshold: 0.05, // より早くトリガーされるように閾値を下げる
    rootMargin: '-10px' // マージンを小さくしてより早くトリガー
  });

  return (
    <div className="font-noto-sans relative">
      <header className="bg-[#fafafa] py-8 md:py-16 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          
          
          <div className="relative">
            <Image
              src="/image/top.jpeg"
              alt="明るく清潔感のあるサロン内装"
              width={1200}
              height={600}
              className="w-full h-[350px] md:h-[500px] object-cover rounded-lg shadow-lg"
            />
            
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
              <div className="text-white px-4 md:px-8 text-center space-y-8">
                <p className="text-base md:text-2xl font-medium mb-6 opacity-0 animate-[fadeInUp_1s_ease-out_0.5s_forwards]">
                開花する、ステージへ。<br />
                カウンセリングからスタイリングまで、<br />私らしく、自由に表現できる。<br />
                </p>
                
                <p className="text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-6 opacity-0 animate-[fadeInUp_1s_ease-out_1.5s_forwards]">
                ここで、私たちの“人生の色”を<br />一緒に変えていきませんか<br />
                  
                </p>
                
                
                <div className="relative">
                  <p className="text-2xl md:text-4xl lg:text-5xl font-medium opacity-0 blur-sm" id="blurText">
                    <span className="inline-block">Liliy hair & spa</span>
                  </p>
                  <style jsx>{`
                    #blurText {
                      animation: blurReveal 2s ease-out 2s forwards;
                    }
                    
                    @keyframes blurReveal {
                      0% {
                        opacity: 0;
                        filter: blur(10px);
                      }
                      100% {
                        opacity: 1;
                        filter: blur(0);
                      }
                    }
                  `}</style>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </header>

     
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-12">
            <a 
              href="https://lin.ee/oR5vEoA" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#e24a4a] text-white px-6 py-3 rounded-full hover:bg-[#bd3535] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0"
            >
              応募する
            </a>
            <button 
              onClick={() => scrollToSection('owner')} 
              className="bg-[#06c755] text-white px-6 py-3 rounded-full hover:bg-[#059144] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0"
            >
              代表からのメッセージを見る
            </button>
      </div>

      <section className="py-16 md:py-24 mt-8 md:mt-12 bg-white">
        <SectionHeader 
          title={<>
            世の中の30代ママ美容師さんが抱える悩み事は、
            <br />
            当サロンでは一切致しません
          </>}
        />
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-2 md:gap-8">
            {/* 左側: よくある悩み */}
            <div className="p-2 md:p-6 rounded-lg h-full">
              <h3 className="text-base md:text-xl font-bold text-center mb-3 md:mb-6 text-gray-600">＜よくある悩み＞</h3>
              <div className="flex flex-col items-center gap-2 md:gap-4 h-full">
                {concerns.map((concern, index) => (
                  <div 
                    key={index}
                    className="border-2 border-gray-200 rounded-lg p-2 md:p-4 w-full text-center bg-white shadow-sm transition-all duration-500 text-xs md:text-base leading-relaxed flex-1"
                  >
                    {concern}
                  </div>
                ))}
              </div>
            </div>

            {/* 右側: Liliyの場合 */}
            <div className="p-2 md:p-6 rounded-lg h-full">
              <h3 className="text-base md:text-xl font-bold text-center mb-3 md:mb-6 text-[#D4AF37]">＜Liliyの場合＞</h3>
              <div className="flex flex-col items-center gap-2 md:gap-4 h-full">
                {[
                  <>
                    <span className="border-b-2 border-[#D4AF37] inline-block mb-4">「あなたらしく働ける場所に」</span><br />
                    家から近い場所で、夜遅くまでの勤務も強制なし。個人の状況を理解し、安心して長く働ける環境を整えています✨
                  </>,
                  <>
                    <span className="border-b-2 border-[#D4AF37] inline-block mb-4">「休みやすい環境で、家族との時間を大切に」</span><br />
                    土日休みはもちろん、子供の行事や急な発熱でも気兼ねなく休める。<br />育休復帰も歓迎の職場です✨
                  </>,
                  <>
                    <span className="border-b-2 border-[#D4AF37] inline-block mb-4">「一人ひとりの声に耳を傾けます」</span><br />
                    経験を活かせる場所で、スタッフの意見を積極的に取り入れ。オーナーが寄り添いながらみんなで理想の職場を作っています✨
                  </>
                ].map((solution, index) => (
                  <div 
                    key={index}
                    className="border-2 border-[#D4AF37] rounded-lg p-2 md:p-4 w-full text-center bg-white shadow-sm transition-all duration-500 text-xs md:text-base leading-relaxed flex-1"
                  >
                    {solution}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-4 bg-white rounded-3xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/50"></div>
        
        <div className="relative z-10">
        <SectionHeader 
          title="Liliy hair & spaの特徴"
        />

         
<div className="mt-8 md:mt-12 px-4 max-w-6xl mx-auto">
  <div 
    className={`max-w-lg mx-auto transition-all duration-1000 ${
      featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}
  >
    <ImageSlideshow />
  </div>
</div>

          <br />

          <div 
            ref={featuresRef}
            className="text-base md:text-xl leading-relaxed text-center max-w-3xl mx-auto space-y-6"
          >
            <div 
              className={`bg-white rounded-lg p-6 shadow-md border border-[#D4AF37]/20 hover:shadow-lg transition-all duration-700 ${
                featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <span className="text-[#D4AF37] font-bold text-lg">①</span>
              あなたのペースで働ける環境
              <br />
              <br />
              <span className="text-gray-700 text-sm md:text-base">
                浅草橋駅から徒歩2分の好立地
                <br />
                <span className="bg-[#D4AF37]/10 px-2 py-1 rounded inline-block mt-1">
                  週1日からでも働けて、<br />土日はゆっくり休める
                </span>
                <br />
                子育ての予定を優先できます
                <br />
                <span className="bg-[#D4AF37]/10 px-2 py-1 rounded inline-block mt-1">
                  急な早退や休みも気兼ねなく相談OK
                </span>
                <br />
                17時帰宅など、ライフスタイルに
                <br />
                合わせた働き方ができます
                <br />
              </span>
            </div>

            <div 
              className={`bg-white rounded-lg p-6 shadow-md border border-[#D4AF37]/20 hover:shadow-lg transition-all duration-700 ${
                featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <span className="text-[#D4AF37] font-bold text-lg">②</span>
              みんなで作る理想の職場
              <br />
              <br />
              <span className="text-gray-700 text-sm md:text-base">
                一人ひとりの想いを大切に
                <br />
                <span className="bg-[#D4AF37]/10 px-2 py-1 rounded inline-block mt-1">
                  不安や悩みに寄り添い、働きやすい環境を<br />みんなで作っています
                </span>
                <br />
                スタッフの意見を積極的に取り入れ
                <br />
                理想のサロンを一緒に創造しましょう
                <br />
              </span>
            </div>

            <div 
              className={`bg-white rounded-lg p-6 shadow-md border border-[#D4AF37]/20 hover:shadow-lg transition-all duration-700 ${
                featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <span className="text-[#D4AF37] font-bold text-lg">③</span>
              実力が正当に評価される職場
              <br />
              <br />
              <span className="text-gray-700 text-sm md:text-base">
                都心と同じ水準の高時給
                <br />
                <span className="bg-[#D4AF37]/10 px-2 py-1 rounded inline-block mt-1">
                  時給1,400円〜2,200円
                </span>
                <br />
                経験を活かした技術に見合った
                <br />
                しっかりとした評価制度
                <br />
                <span className="text-sm text-gray-500">
                  ※今までの経験・スキルをしっかり評価します
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-white">
        <SectionHeader 
          title="Liliy hair & spaで働くことで得られる事"
          subtitle="あなたらしい働き方"
        />
        <div className="max-w-6xl mx-auto px-4">
          <div 
            ref={contentRef}
            className="space-y-8"
          >
            <div 
              className={`bg-white p-8 rounded-lg shadow transition-all duration-700 ${
                contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <h3 className="text-2xl mb-4 font-bold">
                土日休みで実現する、理想のワークライフバランス
              </h3>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="w-full md:w-[400px] flex-shrink-0">
                  <Image
                    src="/image/sejyutu.jpeg"
                    alt="スタッフの様子"
                    width={400}
                    height={300}
                    className="w-full h-[400px] md:h-[300px] rounded-lg object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-base md:text-lg leading-relaxed">
                    <span className="bg-[#D4AF37]/10 px-2 py-1 rounded inline-block">
                      「子供の大切な瞬間も、美容師としての夢も、両方叶えられる」<br />
                      ママ美容師が安心して長く働ける環境です
                    </span>
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    「子供の運動会、見に行けるかな…」そんな心配はもう必要ありません。土日はしっかり休めるから、子供との大切な時間を存分に楽しめます。平日も17時には帰れるので、「お迎えに間に合わない…」というストレスとは無縁。子供の急な発熱でも、気兼ねなく休める環境だから、ママとしても美容師としても、自分らしく働けます。
                  </p>
                </div>
              </div>
            </div>

            <div 
              className={`bg-white p-8 rounded-lg shadow transition-all duration-700 ${
                contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <h3 className="text-2xl mb-4 font-bold">
                あなたの"やってみたい"を大切にする職場
              </h3>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="w-full md:w-[400px] flex-shrink-0">
                  <Image
                    src="/image/neiru.jpeg"
                    alt="スタッフの様子"
                    width={400}
                    height={300}
                    className="w-full h-[400px] md:h-[300px] rounded-lg object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-base md:text-lg leading-relaxed">
                    <span className="bg-[#D4AF37]/10 px-2 py-1 rounded inline-block">
                      「この薬剤を使ってみたい」「新しいメニューを提案したい」<br />
                      美容師としてのクリエイティブな想いを、存分に活かせます
                    </span>
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    「こんな風にやってみたい」というあなたの意見が、サロンの新しい取り組みになることも。スタッフの声に耳を傾け、前向きに取り入れてくれる環境だから、自分のアイデアや工夫を活かしながら、やりがいを持って働けます。また、ネイルやヘッドスパ、耳ツボなど、新しい分野にもチャレンジできる。そんな自由度の高い環境が整っています。
                  </p>
                </div>
              </div>
            </div>

            <div 
              className={`bg-white p-8 rounded-lg shadow transition-all duration-700 ${
                contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <h3 className="text-2xl mb-4 font-bold">
                ライフステージの変化も受け入れてくれる。10年、20年先も長く働ける環境
              </h3>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="w-full md:w-[400px] flex-shrink-0">
                  <Image
                    src="/image/sozai.jpeg"
                    alt="スタッフの様子"
                    width={400}
                    height={300}
                    className="w-full h-[400px] md:h-[300px] rounded-lg object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-base md:text-lg leading-relaxed">
                    <span className="bg-[#D4AF37]/10 px-2 py-1 rounded inline-block">
                      「子育てに合わせて働き方を変えたい」<br />
                      そんな希望に柔軟に対応します
                    </span>
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    子育て前は夜まで働いていたスタッフも、出産後は17時までのパートタイムへ。そして今は正社員復帰も視野に。人生の節目での働き方の変更を温かく受け入れてくれる環境だから、10年先も安心して続けられます。あなたのライフスタイルに合わせて、理想の働き方を実現できる職場です。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <div 
              className={`bg-white p-8 rounded-lg shadow transition-all duration-700 ${
                contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h3 className="text-2xl mb-6 font-bold text-center">
                <span className="relative inline-block">
                  1日のスケジュール
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#D4AF37]/30"></span>
                </span>
              </h3>

              <div className="max-w-3xl mx-auto">
                <div className="max-w-md mx-auto">
                  {/* 早番シフト */}
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="text-lg font-bold text-[#D4AF37] mb-4 text-center border-b-2 border-[#D4AF37]/20 pb-2">
                      平日勤務
                    </h4>
                    <div className="space-y-3">
                      {[
                        { time: "9:50", activity: "出勤・掃除開始" },
                        { time: "10:00", activity: "オープン" },
                        { time: "12:00", activity: "順番に昼休憩" },
                        { time: "16:30", activity: "掃除開始" },
                        { time: "17:00", activity: "退社" },
                      ].map((schedule, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-4 p-3 hover:bg-[#D4AF37]/5 rounded-lg transition-colors duration-300"
                        >
                          <div className="w-20 flex-shrink-0">
                            <span className="font-bold text-[#D4AF37]">{schedule.time}</span>
                          </div>
                          <div className="flex-grow">
                            <span className="text-gray-700">{schedule.activity}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-12">
            <a 
              href="https://lin.ee/oR5vEoA" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#e24a4a] text-white px-6 py-3 rounded-full hover:bg-[#bd3535] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0"
            >
              応募する
            </a>
            
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
      <SectionHeader 
          title="スタッフ紹介"
          subtitle="働く仲間"
        />
        
        <div className="max-w-5xl mx-auto px-4">
          <div className="space-y-8">
            <StaffCard 
              image="/image/kaoru.jpeg"
              name="kaoru"
              position="入社8ヶ月 / スタイリスト"
              message={`年齢的にも新しい環境に飛び込むことへの不安もありました...`}
            />
            
            <StaffCard 
              image="/image/sutahhu.jpeg"
              name="小池 あきえ"
              position="入社7年 / サロンディレクターチーフ"
              message={`前職では、技術を磨く時間もなく、家庭との両立に悩んでいました...`}
            />
          </div>
        </div>
      </section>

    

<section className="py-16 md:py-24 bg-white">
  <SectionHeader 
    title="募集要項"
    subtitle="採用情報"
  />
  <div className="max-w-6xl mx-auto px-4">
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {[
        {
          title: "勤務地",
          content: "東京都台東区柳橋1-23-3 田中ビル2階"
        },
        {
          title: "雇用形態",
          content: "パート・アルバイト（正社員昇給あり）業務委託"
        },
        {
          title: "職種・給与",
          content: (
            <div>
              <p>スタイリスト</p>
              <p>時給1,400円～2,200円</p>
              <p className="text-sm">※経験・スキルに応じて給与決定</p>
              <p className="text-sm">※試用期間3ヶ月（条件変更なし）</p>
            </div>
          )
        },
        {
          title: "勤務時間",
          content: (
            <div className="space-y-2">
              <p>平日 10:00～17:00の中で実働3時間～8時間</p>
              <ul className="list-disc list-inside ml-4 text-gray-600">
                <li>実働6時間以上：休憩45分</li>
                <li>実働7時間以上：休憩60分～120分</li>
                <li>実働3時間～5時間：休憩なし</li>
              </ul>
              <p className="text-sm text-gray-500 mt-2">※希望を考慮して調整可能です</p>
            </div>
          )
        },
        {
          title: "休日",
          content: (
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>週休2日制（日曜＋希望休※土日でもOK）</li>
              <li>祝日定休</li>
              <li>夏季休暇（5日）</li>
              <li>年末年始休暇（5日）</li>
              <li>育児支援休暇（子どもの行事や急な体調不良に対応）</li>
              <li>フレキシブル休暇（月1回シフト提出で調整可能）</li>
              <li>慶弔休暇</li>
              <li>有給休暇（入社半年後から付与・取得推奨）</li>
              <li>長期休暇（要相談）</li>
              <p className="text-sm text-gray-500 mt-2 ml-4">※家庭都合による急な休暇にも柔軟に対応します</p>
            </ul>
          )
        },
        {
          title: "待遇",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium mb-2">保険・手当</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>社会保険全て完備（雇用保険、健康保険、厚生年金）</li>
                  <li>交通費支給</li>
                  <li>健康診断無料</li>
                  <li>入社時引越し手当</li>
                  <li>住宅手当</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">研修・支援</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>講習費無料</li>
                  <li>ヴィッグ支給</li>
                  <li>練習アプリ無料</li>
                  <li>マネジメント＆コミュニケーション勉強会無料</li>
                  <li>メイクレッスン補助</li>
                  <li>着付けレッスン</li>
                </ul>
              </div>
            </div>
          )
        },
        {
          title: "その他",
          content: (
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4AF37]/10 text-gray-700">
                <i className="fas fa-check mr-2 text-[#D4AF37]"></i>
                有給100%消化
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4AF37]/10 text-gray-700">
                <i className="fas fa-check mr-2 text-[#D4AF37]"></i>
                残業なし
              </span>
            </div>
          )
        }
      ].map((item, index) => (
        <div 
          key={index}
          className={`flex flex-col md:flex-row border-b border-gray-100 ${
            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
          }`}
        >
          <div className="w-full md:w-1/4 p-4 md:p-6 bg-[#D4AF37]/5">
            <h4 className="font-bold text-gray-800">{item.title}</h4>
          </div>
          <div className="w-full md:w-3/4 p-4 md:p-6">
            {typeof item.content === 'string' ? (
              <p className="text-gray-600">{item.content}</p>
            ) : (
              item.content
            )}
          </div>
        </div>
      ))}
    </div>

    
  </div>
</section>



      <RequirementSection />

      <section className="py-16 md:py-24 bg-white" id="qa" ref={qaRef}>
        <SectionHeader 
          title="よくあるご質問"
          subtitle="Q&A"
        />
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-4">
            {[
              {
                question: "技術に不安があっても大丈夫ですか？",
                answer: "技術に不安は、大丈夫です。営業中練習を1日30分から1時間していただきます。"
              },
              {
                question: "お客様の年齢層は？",
                answer: "20代から50代の女性が多いです。スパと一緒に癒されたい方が特に多く、リラックスできる空間づくりを心がけています。"
              },
              {
                question: "採用までの流れはどんな感じですか？",
                answer: "採用までの流れは4ステップです。まずはお店の雰囲気を知っていただくための店舗見学、その後履歴書の提出、実際の環境を体験できる体験入店を経て、採用となります。各ステップでご不安な点などございましたら、お気軽にご相談ください。"
              },
              
            ].map((qa, index) => (
              <details 
                key={index} 
                className={`bg-white p-6 rounded-lg shadow-sm group transition-all duration-500 ease-out hover:shadow-md ${
                  qaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <summary className="text-lg md:text-xl font-medium cursor-pointer list-none flex justify-between items-center text-gray-800">
                  <span className="flex items-center gap-3">
                    <span className="text-[#D4AF37]">Q.</span>
                    {qa.question}
                  </span>
                  <span className="transform group-open:rotate-180 transition-transform duration-300 text-[#D4AF37]">
                    ▼
                  </span>
                </summary>
                <div className="mt-4 pl-6 text-gray-600 leading-relaxed">
                  <span className="text-[#D4AF37] font-medium">A.</span>
                  <span className="ml-2">{qa.answer}</span>
                </div>
              </details>
            ))}
          </div>
          
          
        </div>
      </section>

      <section className="py-12 md:py-24 bg-white" id="owner" ref={ownerRef}>
        <SectionHeader 
          title="オーナー挨拶"
          subtitle="Message from Owner"
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-white p-6 md:p-12 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <div className="md:w-1/3 flex flex-col items-center text-center">
                <div className="w-40 h-40 md:w-64 md:h-64 overflow-hidden rounded-full border-4 border-white shadow-md mb-4">
                  <Image
                    src="/image/tanaka.jpeg"
                    alt="オーナーの写真"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover object-top"
                    priority
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">オーナー</h3>
                <p className="text-gray-600 mb-6 md:mb-0"></p>
              </div>
              
              <div className="md:w-2/3">
                <div className="prose prose-sm md:prose-lg max-w-none">
                  <p className="space-y-4 md:space-y-6">
                    <span className="block mb-4 md:mb-6 text-gray-800 text-base md:text-lg leading-relaxed">
                      私たちの美容院では、一人ひとりのライフスタイルを尊重し、自由な働き方を大切にしています。
                    </span>

                    <span className="block mb-4 md:mb-6 text-gray-800 text-base md:text-lg leading-relaxed">
                      基本の営業時間は10時から17時。お子さんの行事や大切な予定、さらには「推し活」など、プライベートの時間も大切にできる柔軟な勤務環境を整えています。お子様の急な発熱や授業参観などにも対応可能なので、安心して働ける職場です。
                    </span>

                    <span className="block mb-4 md:mb-6 text-gray-800 text-base md:text-lg leading-relaxed">
                      また、「もっとしっかり働きたい！」という方のために、夜23時までの勤務も可能。現在、17時から23時の時間帯で働ける方を募集中です！ 生活スタイルに合わせて、無理なく続けられる働き方を一緒に見つけていきましょう。
                    </span>

                    <span className="block mb-4 md:mb-6 text-gray-800 text-base md:text-lg leading-relaxed">
                      さらに、当サロンではスタッフ同士の直接技術指導が人気で、学びながらスキルアップできる環境が整っています。技術向上だけでなく、コミュニケーションの機会も多く、働きやすい雰囲気が魅力です。
                    </span>

                    <span className="block mb-4 md:mb-6 text-gray-800 text-base md:text-lg leading-relaxed">
                      私たちは、美容師一人ひとりが<strong>「働きやすさ」と「やりがい」</strong>を感じられる職場を目指しています。自分らしい働き方を、ぜひここで実現してください。
                    </span>

                    <span className="block text-gray-800 text-base md:text-lg leading-relaxed">
                      皆さまのご応募を心よりお待ちしております！
                    </span>
                  </p>
                </div>
                
                
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#333] text-white py-8 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <h3 className="text-xl mb-4 flex items-center">
                <i className="fab fa-instagram text-2xl mr-2"></i>
                Instagram
              </h3>
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-4">
                  <a 
                    href="https://www.instagram.com/liliyhair111/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl hover:text-[#4a90e2]"
                  >
                    <i className="fab fa-instagram"></i>
                    <span className="text-sm ml-2">サロン公式</span>
                  </a>
                  <a 
                    href="https://liliy-hair.jimdofree.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl hover:text-[#4a90e2]"
                  >
                    <i className="fab fa-instagram"></i>
                    <span className="text-sm ml-2">ホームページ</span>
                  </a>
                 
                </div>
                
              </div>
            </div>
            <div>
              <h3 className="text-xl mb-4">店舗情報</h3>
              <p>店舗名：Liliy hair & spa</p>
              <p>住所：〒111-0052 東京都台東区柳橋1-23-3 田中ビル2F</p>
              <p>電話：(03) 5829-4395</p>
              <p>メール：liliyasakusabashi@gmail.com</p>
              <p>営業時間：10:00-23:00（最終受付 22:00、日曜日は19:00最終受付）</p>
              <p>定休日：不定休</p>
              <div className="mt-4 w-full h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6480.310370202001!2d139.78697299999996!3d35.6977986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188eb3954dbf71%3A0x4af3a0d978e889f7!2z576O5a655a6kIExpTGl5IGhhaXIgTElCRVJU4oCZRSDmtYXojYnmqYvmnbHlj6Plupc!5e0!3m2!1sja!2sjp!4v1743847516348!5m2!1sja!2sjp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
          
        </div>
      </footer>

      {/* トップへ戻るボタン */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-4 right-4 z-40 bg-gray-700 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-600 transition-all duration-300 ${
          showScrollTop ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-label="トップへ戻る"
      >
        <svg 
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  );
}
// スタイリングの追加
const styles = {
  sectionTitle: `
    relative
    inline-block
    text-2xl md:text-3xl lg:text-4xl
    font-bold
    text-center
    pb-2
    after:content-['']
    after:absolute
    after:bottom-0
    after:left-1/2
    after:transform
    after:-translate-x-1/2
    after:w-12
    after:h-1
    after:bg-rose-400
  `,
};

MainComponent.propTypes = {
  // 必要に応じてpropTypesを定義
};

const Page = () => {
  return <MainComponent />;
};

export default Page;
