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
        <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#D3B58D]"></span>
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
      <span className="absolute left-0 bottom-1 w-full h-3 bg-rose-200/30 -rotate-1 z-0"></span>
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
    bg: 'bg-[#f8f6f4]',      // ベースの明るいベージュ
    text: 'text-[#4a4a4a]',  // ダークグレー
    accent: 'bg-[#d4c3b7]',  // ライトブラウン
  },
  secondary: {
    light: 'bg-[#fdfbf9]',   // オフホワイト
    border: 'border-[#e8e2dc]', // ライトベージュ
    hover: 'hover:bg-[#f3efe9]', // ホバー時のベージュ
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
          <i className="fas fa-quote-left text-[#D3B58D] text-xl"></i>
          <span className="text-[#D3B58D] font-medium"></span>
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
                でも<span className="font-bold text-[#D3B58D]">Liliyでは</span>、
                <span className="bg-[#D3B58D]/10 px-2 py-1 rounded inline-block mt-1">
                  長年の経験を活かし、半年でカラーリストからメンズカットまでデビューできました。
                  無理なく入客できる環境が心強いです。
                </span>
              </p>
              
              <p className="text-gray-700">
                50歳を超えて身体的な不安もある中、
                <span className="border-b-2 border-[#D3B58D]">
                  休みの設定も柔軟で、子供との時間もしっかり確保できるため、仕事も子育ても充実しています！
                </span>
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-700">
                でも<span className="font-bold text-[#D3B58D]">Liliyに入社して</span>、
                <span className="bg-[#D3B58D]/10 px-2 py-1 rounded inline-block mt-1">
                  オーナーをはじめ、チーフなどスタッフ全員の協力のもと、無理なく一歩ずつスキルアップができています。
                  前職では外部講習の費用負担もあり、パートとの両立が厳しく夫からも心配されていましたが...
                </span>
              </p>
              
              <p className="text-gray-700">
                今では、
                <span className="border-b-2 border-[#D3B58D]">
                  予約状況に応じて早上がりも可能で、家事にもしっかり時間を使えるようになりました。
                  仕事と家庭のバランスが取れ、心に余裕が生まれています。
                </span>
              </p>
              
              <p className="text-gray-700">
                <span className="bg-[#D3B58D]/10 px-2 py-1 rounded inline-block mt-1">
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
      src: "/image/gaikan.jpg",
      alt: "外観の様子"
    },
    {
      src: "/image/tenai2.jpeg",
      alt: "店内の様子"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

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
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
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
    "「お客様との会話も型にはめられて…」\n一つ一つの行動をオーナーに確認しないといけない状況で、自分の個性を出せずストレスが溜まっていく。",
      "「子供の行事で早退したい」\n「体調が悪くて休みたい」\nそんな当たり前の願いも、言い出せない雰囲気。家庭との両立に悩む日々…。",
      "カラーやネイル、ヘッドスパなど得意な技術があっても、年齢を理由に新しいことへの挑戦を制限され、給料も上がらない現実。",
      "「このまま続けていても、将来は大丈夫かな…？」\n家族のために働きたいのに、心も体も疲れ果てる💧",
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
        sub: "平日のみの勤務で、プライベートとの両立が可能です"
      },
      {
        main: "30代～60代の方が活躍中！",
        sub: "豊富な経験を活かして、無理なく長く働きたい方"
      },
      {
        main: "違うお店で働いているけど夜も働きたい方",
        sub: "17時以降の夜間勤務で副業として働きたい方"
      },
      {
        main: "あなたらしい接客ができる方",
        sub: "「こうしなければならない」という固定観念に縛られず働きたい方"
      },
      
    ];

    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.2,
      rootMargin: '-50px'
    });

    return (
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#D3B58D]/10 to-[#D3B58D]/5">
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
                    <div className="w-6 h-6 bg-[#D3B58D]/20 rounded-full flex items-center justify-center">
                      <span className="text-black text-sm font-medium">
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
            <Link 
              href="/contact" 
              className="bg-[#e24a4a] text-white px-6 py-3 rounded-full hover:bg-[#bd3535] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0"
            >
              応募する
            </Link>
            
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
                  1年後、お客様から必要とされ<br />
                  5年後、地域から必要とされ<br />
                  10年後は未来から必要とされる美容師へ。
                </p>
                
                <p className="text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-6 opacity-0 animate-[fadeInUp_1s_ease-out_1.5s_forwards]">
                  月が満ち、地域が満ち、女性が満ちる、<br />
                  そんな世界観を共に創っていただけませんか
                </p>
                
                <div className="relative">
                  <p className="text-2xl md:text-4xl lg:text-5xl font-medium opacity-0 blur-sm" id="blurText">
                    <span className="inline-block">Liliy HAIR & SPA</span>
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
            <Link 
              href="/contact" 
              className="bg-[#e24a4a] text-white px-6 py-3 rounded-full hover:bg-[#bd3535] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0"
            >
              応募する
            </Link>
            <button className="bg-[#06c755] text-white px-6 py-3 rounded-full hover:bg-[#059144] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0">
              代表からのメッセージを見る
            </button>
      </div>

      <section className="py-16 md:py-24 mt-8 md:mt-12">
        <SectionHeader 
          title="世の中の50代ママ美容師さんが抱える悩み事、当サロンでは一切致しません"
          
        />
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-2 md:gap-8">
            {/* 左側: 一般的な美容室の悩み */}
            <div className="p-2 md:p-6 rounded-lg">
              <h3 className="text-base md:text-xl font-bold text-center mb-3 md:mb-6 text-red-600">＜他店＞</h3>
              <div className="flex flex-col items-center gap-2 md:gap-4">
                {concerns.map((concern, index) => (
                  <React.Fragment key={index}>
                    <div 
                      className={`border-2 border-red-200 rounded-lg p-2 md:p-4 w-full text-center bg-white shadow-sm transition-all duration-500 text-xs md:text-base leading-relaxed whitespace-pre-line`}
                    >
                      {concern}
                    </div>
                    
                    {index < concerns.length - 1 && (
                      <div className="text-red-400 text-base md:text-2xl">
                        ↓
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* 右側: michillでの解決策 */}
            <div className="p-2 md:p-6 rounded-lg">
              <h3 className="text-base md:text-xl font-bold text-center mb-3 md:mb-6 text-[#D3B58D]">＜Liliyの場合＞</h3>
              <div className="flex flex-col items-center gap-2 md:gap-4">
                {[
                  "「自分らしい接客ができる」\n自分の個性を活かした接客で、お客様との信頼関係を築けます✨",
      "「家族との時間を大切にできる」\n子供の行事や体調不良での早退・休暇も気兼ねなく相談できます。\n自分を大切にできる環境だから、家庭との両立も叶います✨",
      "「年齢に関係なく、挑戦できる」\n得意な技術を活かし、新しいことにも挑戦できる環境。\n自分のペースで成長でき、それが評価に反映されます✨",
      "「将来に希望が持てる」\n心身ともに健康で、自分らしく長く働ける。\n次の世代のためにも、より良い環境を一緒に作っていけます✨"
                ].map((solution, index) => (
                  <React.Fragment key={index}>
                    <div 
                      className={`border-2 border-[#D3B58D] rounded-lg p-2 md:p-4 w-full text-center bg-white shadow-sm transition-all duration-500 text-xs md:text-base leading-relaxed`}
                    >
                      {solution}
                    </div>
                    
                    {index < 3 && (
                      <div className="text-[#D3B58D] text-base md:text-2xl">
                        ↓
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-4 bg-gradient-to-r from-[#D3B58D]/10 to-[#D3B58D]/5 rounded-3xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/50"></div>
        
        <div className="relative z-10">
        <SectionHeader 
          title="Liliy HAIR & SPAの特徴"
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
              className={`bg-white rounded-lg p-6 shadow-md border border-[#D3B58D]/20 hover:shadow-lg transition-all duration-700 ${
                featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <span className="text-[#D3B58D] font-bold text-lg">①</span>
              実力が正当に評価される高単価サロン
              <br />
              <br />
              <span className="text-gray-700 text-sm md:text-base">
                平均単価11,000円〜15,000円で
                <br />
                <span className="bg-[#D3B58D]/10 px-2 py-1 rounded inline-block mt-1">
                  経験を活かした技術に見合った収入
                </span>
                <br />
                月給25万〜30万円も目指せます
                <br />
                <span className="text-sm text-gray-500">
                  ※今までの経験・スキルをしっかり評価します
                </span>
              </span>
            </div>

            <div 
              className={`bg-white rounded-lg p-6 shadow-md border border-[#D3B58D]/20 hover:shadow-lg transition-all duration-700 ${
                featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <span className="text-[#D3B58D] font-bold text-lg">②</span>
              あなたのペースで働ける環境
              <br />
              <br />
              <span className="text-gray-700 text-sm md:text-base">
                子育ての予定を優先できます
                <br />
                <span className="bg-[#D3B58D]/10 px-2 py-1 rounded inline-block mt-1">
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
              className={`bg-white rounded-lg p-6 shadow-md border border-[#D3B58D]/20 hover:shadow-lg transition-all duration-700 ${
                featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <span className="text-[#D3B58D] font-bold text-lg">③</span>
              あなたの"好き"を活かせる職場
              <br />
              <br />
              <span className="text-gray-700 text-sm md:text-base">
                ヘアもネイルも、得意分野を活かせます
                <br />
                <span className="bg-[#D3B58D]/10 px-2 py-1 rounded inline-block mt-1">
                  マニュアル化された接客は一切ありません
                </span>
                <br />
                お客様との自然な会話を
                <br />
                大切にできる環境です
                <br />
                
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#D3B58D]/10 to-[#D3B58D]/5">
        <SectionHeader 
          title="Liliy HAIR & SPAで働くことで得られる事"
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
              自分らしい接客スタイルで、お客様との絆を深められます
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
                    <span className="bg-[#D3B58D]/10 px-2 py-1 rounded inline-block">マニュアル化された接客は一切ありません。</span>
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    長年の経験を活かし、お客様一人ひとりに合わせた自然な会話と施術を提供できます。これまでの経験を活かしながら、新しい可能性も見つけられる環境です。
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
              得意分野を活かせる多彩なキャリアパス
              </h3>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="w-full md:w-[400px] flex-shrink-0">
                  <Image
                    src="/image/miga.jpg"
                    alt="スタッフの様子"
                    width={400}
                    height={300}
                    className="w-full h-[400px] md:h-[300px] rounded-lg object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-base md:text-lg leading-relaxed">
                    <span className="bg-[#D3B58D]/10 px-2 py-1 rounded inline-block">カラー、ネイル、ヘッドスパなど、得意な技術を存分に活かせます。</span>
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    年齢に関係なく、新しい技術へのチャレンジも応援。実力に応じた評価システムで、着実なキャリアアップを実現できます。
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>カラーリストとしての専門性を活かせる</li>
                    <li>ヘッドスパ技術の向上支援</li>
                    <li>ネイルなど、複数のスキルを活かせる環境</li>
                  </ul>
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
              家庭との両立を全面的にサポート
              </h3>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="w-full md:w-[400px] flex-shrink-0">
                  <Image
                    src="/image/sezyutu.jpg"
                    alt="スタッフの様子"
                    width={400}
                    height={300}
                    className="w-full h-[400px] md:h-[300px] rounded-lg object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-base md:text-lg leading-relaxed">
                    <span className="bg-[#D3B58D]/10 px-2 py-1 rounded inline-block">子育てと仕事の両立を応援する柔軟な勤務体制</span>
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>子供の行事や急な体調不良にも対応可能</li>
                    <li>土日休み相談可能</li>
                    <li>予約状況に応じて早上がりも可能</li>
                  </ul>
                  <p className="text-gray-600 italic">
                    "子育て中でも安心して働ける環境があり、家族との時間も大切にできています"
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
                  とある現場の1日のスケジュール
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#D3B58D]/30"></span>
                </span>
              </h3>

<div className="max-w-3xl mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* 早番シフト */}
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h4 className="text-lg font-bold text-[#D3B58D] mb-4 text-center border-b-2 border-[#D3B58D]/20 pb-2">
        早番シフト
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
            className="flex items-center gap-4 p-3 hover:bg-[#D3B58D]/5 rounded-lg transition-colors duration-300"
          >
            <div className="w-20 flex-shrink-0">
              <span className="font-bold text-[#D3B58D]">{schedule.time}</span>
            </div>
            <div className="flex-grow">
              <span className="text-gray-700">{schedule.activity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* 遅番シフト */}
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h4 className="text-lg font-bold text-[#D3B58D] mb-4 text-center border-b-2 border-[#D3B58D]/20 pb-2">
        遅番シフト
      </h4>
      <div className="space-y-3">
        {[
          { time: "16:50", activity: "出勤・掃除開始" },
          { time: "17:00", activity: "オープン" },
          { time: "18:00", activity: "順番に夜ご飯休憩" },
          { time: "22:30", activity: "掃除開始" },
          { time: "23:00", activity: "退社" },
        ].map((schedule, index) => (
          <div 
            key={index}
            className="flex items-center gap-4 p-3 hover:bg-[#D3B58D]/5 rounded-lg transition-colors duration-300"
          >
            <div className="w-20 flex-shrink-0">
              <span className="font-bold text-[#D3B58D]">{schedule.time}</span>
            </div>
            <div className="flex-grow">
              <span className="text-gray-700">{schedule.activity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  <div className="mt-8 p-6 bg-[#D3B58D]/10 rounded-lg">
    <p className="text-sm text-gray-600 text-center">
      ※「もっと働きたい！」という方のために、夜は23時までの勤務も可能
    </p>
  </div>
</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-12">
            <Link 
              href="/contact" 
              className="bg-[#e24a4a] text-white px-6 py-3 rounded-full hover:bg-[#bd3535] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0"
            >
              応募する
            </Link>
            
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
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

    

<section className="py-16 md:py-24 bg-gradient-to-r from-[#D3B58D]/10 to-[#D3B58D]/5">
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
          content: "正社員・パート・アルバイト・業務委託"
        },
        {
          title: "職種・給与",
          content: (
            <div className="space-y-4">
              <div>
                <p className="font-medium">スタイリスト</p>
                <div className="ml-4 space-y-2">
                  <p className="font-medium text-[#D3B58D]">【パート・アルバイト】</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>時給1,400円〜2,200円</li>
                  </ul>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="font-medium mb-2">日中勤務</p>
                      <p className="text-gray-600">10時～17時</p>
                      <p className="text-lg font-medium text-gray-800">時給1,400円～2,200円</p>
                    </div>
                    <div className="border border-[#D3B58D] rounded-lg p-4 bg-[#D3B58D]/5 relative">
                      <span className="absolute -top-3 -right-3 bg-[#e24a4a] text-white px-3 py-1 rounded-full text-sm transform rotate-12">
                        募集中！
                      </span>
                      <p className="font-medium mb-2">夜勤勤務</p>
                      <p className="text-gray-600">17時～20時</p>
                      <p className="text-lg font-medium text-gray-800">時給1,800円～2,200円</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    ※試用期間3ヶ月（条件変更なし）
                  </p>
                </div>
              </div>
            </div>
          )
        },
        {
          title: "勤務時間",
          content: (
            <div className="space-y-2">
              <p>平日 10:00～23:00の中で実働3時間～8時間</p>
              <ul className="list-disc list-inside ml-4 text-gray-600">
                <li>実働6時間以上：休憩45分</li>
                <li>実働7時間以上：休憩60分～120分</li>
                <li>実働3時間～5時間：休憩なし</li>
              </ul>
              <p className="text-sm text-gray-500 mt-2">※シフトは希望を考慮して調整可能です</p>
            </div>
          )
        },
        {
          title: "休日",
          content: (
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>週休2日制（日曜＋希望休）</li>
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
                  <li>制服支給（週1着用日があります）</li>
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
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#D3B58D]/10 text-gray-700">
                <i className="fas fa-check mr-2 text-[#D3B58D]"></i>
                有給100%消化
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#D3B58D]/10 text-gray-700">
                <i className="fas fa-check mr-2 text-[#D3B58D]"></i>
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
          <div className="w-full md:w-1/4 p-4 md:p-6 bg-[#D3B58D]/5">
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

      <section className="py-16 md:py-24" id="qa" ref={qaRef}>
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
                    <span className="text-[#D3B58D]">Q.</span>
                    {qa.question}
                  </span>
                  <span className="transform group-open:rotate-180 transition-transform duration-300 text-[#D3B58D]">
                    ▼
                  </span>
                </summary>
                <div className="mt-4 pl-6 text-gray-600 leading-relaxed">
                  <span className="text-[#D3B58D] font-medium">A.</span>
                  <span className="ml-2">{qa.answer}</span>
                </div>
              </details>
            ))}
          </div>
          
          
        </div>
      </section>

      <section className="py-12 md:py-24 bg-gradient-to-r from-[#D3B58D]/10 to-[#D3B58D]/5">
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
                    href="https://www.instagram.com/michill_hair/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl hover:text-[#4a90e2]"
                  >
                    <i className="fab fa-instagram"></i>
                    <span className="text-sm ml-2">サロン公式</span>
                  </a>
                  <a 
                    href="https://www.instagram.com/rony_19795/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl hover:text-[#4a90e2]"
                  >
                    <i className="fab fa-instagram"></i>
                    <span className="text-sm ml-2">代表田中</span>
                  </a>
                </div>
                
              </div>
            </div>
            <div>
              <h3 className="text-xl mb-4">店舗情報</h3>
              <p>店舗名：HAIR LIBERT'E Liliy</p>
              <p>住所：〒111-0052 東京都台東区柳橋1-23-3 田中ビル2F</p>
              <p>電話：(03) 5829-4395</p>
              <p>メール：liliyasakusabashi@gmail.com</p>
              <p>営業時間：10:00-23:00（最終受付 22:00、日曜日は19:00最終受付）</p>
              <p>定休日：不定休（ホームページに記載）</p>
              <div className="mt-4 w-full h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0679165645147!2d139.78397687677547!3d35.69580037258425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188eb2aa8636c1%3A0x6c74975cf929d8f0!2z44CSMTExLTAwNTIg5p2x5Lqs6YO95Y-w5p2x5Yy65byB5qmL77yR5LiB55uu77yS77yT4oiS77yT!5e0!3m2!1sja!2sjp!4v1711604529145!5m2!1sja!2sjp"
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
