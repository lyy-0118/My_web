import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Briefcase, Heart, Lightbulb, ChevronRight, Github, Mail, Phone, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data
const PERSONAL_INFO = {
  name: '李莹莹',
  enName: 'Yingying Li',
  role: '人工智能专业大三学生',
  intro: '一个专业为人工智能的大三在读学生',
  currentWork: '学习 AI 应用，Agent 开发，C++/C 等编程知识，以及常见算法',
  interests: ['AI 应用', '摄影', '旅行'],
  traits: ['做事有规划'],
  avatarUrl: '/images/profile.jpg'
};

const CHAT_RULES = [
  { keywords: ['现在', '在做什么', '忙什么'], reply: '我最近正忙着搭建这个个人主页，顺便整理一下作品集。空余时间还会研究 AI 应用和 C++/C 相关的算法。' },
  { keywords: ['作品', '项目', '成果'], reply: '我的作品集还在陆续整理中，主要涉及 AI 应用和知识整理方面的实践项目，等上线了第一时间分享给你！' },
  { keywords: ['联系', '微信', '电话', '邮箱'], reply: '你可以点击左侧的 GitHub、邮箱或者电话图标直接联系到莹莹本人。' },
  { keywords: ['擅长', '能力', '技能'], reply: '我在内容表达、AI 应用和知识整理方面有一些心得。' },
  { keywords: ['兴趣', '爱好', '喜欢'], reply: '除了钻研 AI，我还特别喜欢摄影和旅行，感受不一样的风景。' },
  { keywords: ['你是谁', '李莹莹', '身份'], reply: '我是莹莹的数字分身。她本人是人工智能专业的大三学生，是个做事很有规划的人。' },
];

const DEFAULT_REPLY = '这个问题难倒我了...你可以换个方式问我，或者问问我最近在忙什么？有哪些作品？怎么联系？';

export default function HomePage() {
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const phoneNumber = '19725518835';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [messages, setMessages] = useState([
    { role: 'bot', content: '嗨！我是李莹莹的数字分身。想了解关于她的学习经历、作品或者联系方式吗？尽管问我吧。', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      let botReply = DEFAULT_REPLY;
      for (const rule of CHAT_RULES) {
        if (rule.keywords.some(k => input.includes(k))) {
          botReply = rule.reply;
          break;
        }
      }
      const botMsg = { role: 'bot', content: botReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-white text-slate-700">
      <main className="max-w-6xl mx-auto px-6 py-16 md:py-28">
        {/* Header Section */}
        <section className="mb-12 md:mb-16 flex flex-row items-center gap-5 md:gap-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="shrink-0"
          >
            <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-4 ring-primary/20 shadow-2xl shadow-primary/10">
              <AvatarImage src={PERSONAL_INFO.avatarUrl} className="object-cover" />
              <AvatarFallback className="text-xl font-bold bg-primary/10 text-primary">LYY</AvatarFallback>
            </Avatar>
          </motion.div>
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="flex flex-row items-center items-baseline gap-3 md:gap-5 mb-4">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
                  {PERSONAL_INFO.name}
                </h1>
                <span className="text-lg md:text-xl text-slate-400 font-medium tracking-wider">
                  {PERSONAL_INFO.enName}
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/20 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                <span className="text-xs font-medium text-primary">{PERSONAL_INFO.role}</span>
              </div>
              <p className="text-base md:text-lg text-slate-600 font-normal max-w-xl leading-relaxed">
                <span className="text-primary font-semibold">{'{'}</span> {PERSONAL_INFO.intro} <span className="text-primary font-semibold">{'}'}</span>
              </p>
            </motion.div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-start">
          {/* Info Section */}
          <section className="space-y-8 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex-1"
            >
              <Card className="h-full border-none bg-slate-50 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" /> 我现在主要在做
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {PERSONAL_INFO.currentWork}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <Card className="border-none bg-slate-50 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-primary" /> 兴趣爱好
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {PERSONAL_INFO.interests.map(item => (
                    <Badge key={item} variant="secondary" className="bg-white text-slate-600 border-none shadow-sm text-[10px] px-2 py-0.5">
                      {item}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
              <Card className="border-none bg-slate-50 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-primary" /> 个人特点
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {PERSONAL_INFO.traits.map(item => (
                    <Badge key={item} className="bg-primary text-white border-none shadow-sm text-[10px] px-2 py-0.5">
                      {item}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-6"
            >
              <div className="flex gap-4 items-center">
                {isMobile ? (
                  <a 
                    href={`tel:+86${phoneNumber}`} 
                    className="p-3 bg-slate-50 rounded-xl text-slate-600 hover:bg-primary hover:text-white transition-all shadow-sm"
                    title="拨打电话"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                ) : (
                  <button
                    onClick={handleCopyPhone}
                    className="flex items-center gap-2 px-3 py-3 bg-slate-50 rounded-xl text-slate-600 hover:bg-primary hover:text-white transition-all shadow-sm"
                    title="复制电话号码"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-xs font-medium">{phoneNumber}</span>
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                )}
                <a 
                  href="mailto:1535249401@qq.com" 
                  className="p-3 bg-slate-50 rounded-xl text-slate-600 hover:bg-primary hover:text-white transition-all shadow-sm"
                  title="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a 
                  href="https://github.com/lyy-0118" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-50 rounded-xl text-slate-600 hover:bg-primary hover:text-white transition-all shadow-sm"
                  title="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </section>

          {/* Chat Section */}
          <section className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="h-full"
            >
              <Card className="border-2 border-primary/10 shadow-2xl shadow-primary/10 h-full min-h-[520px] flex flex-col relative overflow-hidden bg-gradient-to-br from-white to-primary/5">
                <CardHeader className="border-b border-primary/10 bg-gradient-to-r from-primary/10 to-transparent backdrop-blur-md z-10 shrink-0 py-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/30">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-slate-900">数字分身 LYY-AI</CardTitle>
                        <CardDescription className="text-[10px] font-medium text-primary uppercase tracking-wider">在线聊天</CardDescription>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-primary/10">
                      <span className="w-1 h-1 rounded-full bg-primary animate-pulse"></span>
                      <span className="text-[10px] font-medium text-primary">AI 在线</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 overflow-hidden p-0 relative bg-slate-50/20">
                  <ScrollArea className="h-full p-5" viewportRef={scrollRef}>
                    <div className="space-y-5 pb-5">
                      <AnimatePresence>
                        {messages.map((msg, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                              <Avatar className="w-8 h-8 border border-white shadow-sm shrink-0">
                                {msg.role === 'user' ? <AvatarFallback className="bg-slate-200 text-slate-600"><User className="w-4 h-4" /></AvatarFallback> : <AvatarFallback className="bg-primary text-white"><Bot className="w-4 h-4" /></AvatarFallback>}
                              </Avatar>
                              <div className={`group relative`}>
                                <div className={`px-4 py-2.5 rounded-2xl text-[13px] shadow-sm leading-relaxed ${
                                  msg.role === 'user' 
                                    ? 'bg-primary text-white rounded-tr-none' 
                                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                                }`}>
                                  {msg.content}
                                </div>
                                <div className={`text-[9px] mt-1 font-medium text-slate-400 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                  {msg.time}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </ScrollArea>
                </CardContent>

                <div className="p-5 border-t bg-white shrink-0">
                  <div className="flex gap-2">
                    <Input
                      placeholder="和数字分身聊聊..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="bg-slate-50 border-none focus-visible:ring-primary h-10 px-4 rounded-lg text-sm"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="bg-primary hover:bg-primary/90 h-10 w-10 rounded-lg transition-all shadow-md shadow-primary/20 p-0"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['最近在忙什么？', '有哪些作品？', '怎么联系？'].map((q, i) => (
                      <button 
                        key={i}
                        onClick={() => setInput(q)}
                        className="text-[10px] font-medium px-2 py-1 bg-slate-50 text-slate-500 hover:bg-primary/5 hover:text-primary rounded-md transition-all border border-transparent hover:border-primary/20"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </section>
        </div>

        <footer className="mt-24 text-center">
          <p className="text-[10px] text-slate-300 uppercase tracking-widest">© 2024 Yingying Li • Built with Passion</p>
        </footer>
      </main>
    </div>
  );
}
