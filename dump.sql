--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: hashtags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hashtags (
    id integer NOT NULL,
    hashtag text NOT NULL
);


--
-- Name: hashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hashtags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.hashtags_id_seq OWNED BY public.hashtags.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    "userIdLike" integer NOT NULL,
    "postId" integer NOT NULL
);


--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    content text NOT NULL,
    link text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer NOT NULL
);


--
-- Name: postsHashtags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."postsHashtags" (
    id integer NOT NULL,
    "hashtagId" integer NOT NULL,
    "postId" integer NOT NULL
);


--
-- Name: postsHashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."postsHashtags_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: postsHashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."postsHashtags_id_seq" OWNED BY public."postsHashtags".id;


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    image text NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: hashtags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags ALTER COLUMN id SET DEFAULT nextval('public.hashtags_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: postsHashtags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."postsHashtags" ALTER COLUMN id SET DEFAULT nextval('public."postsHashtags_id_seq"'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: hashtags; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.hashtags VALUES (1, '#videos');
INSERT INTO public.hashtags VALUES (2, '#saddisco');


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.likes VALUES (4, 1, 2);
INSERT INTO public.likes VALUES (6, 4, 2);
INSERT INTO public.likes VALUES (7, 5, 6);
INSERT INTO public.likes VALUES (8, 5, 2);
INSERT INTO public.likes VALUES (12, 5, 11);
INSERT INTO public.likes VALUES (13, 5, 9);
INSERT INTO public.likes VALUES (16, 1, 9);
INSERT INTO public.likes VALUES (19, 1, 11);
INSERT INTO public.likes VALUES (22, 3, 9);


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts VALUES (2, 'Come join us at F.A.L.E. and help domestic elfs', 'https://harrypotter.fandom.com/pt-br/wiki/Fundo_de_Apoio_%C3%A0_Libera%C3%A7%C3%A3o_dos_Elfos', '2022-10-22 18:03:07.396042', 2);
INSERT INTO public.posts VALUES (6, 'my new book is outtttttttttttt... buy your copy, mtfckr', 'https://g1.globo.com/pop-arte/noticia/2019/08/27/saga-millenium-chega-ao-fim-com-lancamento-de-seu-6o-livro.ghtml', '2022-10-22 18:48:39.41466', 3);
INSERT INTO public.posts VALUES (9, 'Awesomeee band... and they dont have a guitar', 'https://www.royalbloodband.com/', '2022-10-23 12:33:49.19196', 1);
INSERT INTO public.posts VALUES (11, '#sadDisco come listen to Sad Discooo', 'https://flipturn.band/', '2022-10-23 12:36:54.549384', 5);


--
-- Data for Name: postsHashtags; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."postsHashtags" VALUES (2, 2, 11);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (19, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvbmFsZG9Acm9uYWxkby5jb20iLCJwYXNzd29yZCI6InJvbmFsZG8iLCJpYXQiOjE2NjY1MzcyMjUsImV4cCI6MTY2NjU0MDgyNX0.yFUNsKz5ULkbEeCrC8Y1JJObhEldPOpLgo8OhImAKoU');
INSERT INTO public.sessions VALUES (20, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZsaXB0dXJuQGZsaXB0dXJuLmNvbSIsInBhc3N3b3JkIjoiZmxpcHR1cm4iLCJpYXQiOjE2NjY1MzkyOTMsImV4cCI6MTY2NjU0Mjg5M30.DuRfHOhMiepPU5dSbA60MzS6fBDZ3lie6laVY317rOo');
INSERT INTO public.sessions VALUES (21, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvbmFsZG9Acm9uYWxkby5jb20iLCJwYXNzd29yZCI6InJvbmFsZG8iLCJpYXQiOjE2NjY1NjM3NDUsImV4cCI6MTY2NjU2NzM0NX0.evALKnNtBQ2M5GRYJpQIW3NcNuv7KjeOxuAT_kmGOwk');
INSERT INTO public.sessions VALUES (22, 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxpc2JldGhAbGlzYmV0aC5jb20iLCJwYXNzd29yZCI6Imxpc2JldGgiLCJpYXQiOjE2NjY1NjYyOTksImV4cCI6MTY2NjU2OTg5OX0.2FsCGlZS3ZI_7AY8rYP6IQ0POzFH_9oJp2xpJGBByfk');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'ronaldo@ronaldo.com', 'ronaldoa', '$2b$10$V6qRSbWfWz74v/nBuO88IeDD6KwP1lJdQxt0SNwgjMe25JOqqZsUe', 'Ronaldo', 'https://i.pinimg.com/originals/87/96/10/8796107a68ffd7965c01c165ddca4354.jpg');
INSERT INTO public.users VALUES (2, 'hermione@hermione.com', 'FaleHermione', '$2b$10$aff.bhksDej9ZjJoIep5p.J.aLV5toI1N51T.xE8EyQqi50BqydiS', 'Hermione', 'http://4.bp.blogspot.com/-clk-DZnT4F0/Tarp4GMLT_I/AAAAAAAAAKI/krB9xuLDk6c/s1600/Hermione-Jean-Granger.jpg');
INSERT INTO public.users VALUES (3, 'lisbeth@lisbeth.com', 'DragonTattooGirl', '$2b$10$uFxkwU9sz5DQLp2FV3pqcu9IQC6rUxZuftBCXGRCjAf0TWrSASKe.', 'Lisbeth', 'https://media.kasperskydaily.com/wp-content/uploads/sites/94/2015/09/06140754/girl-with-dragon-tattoo-FB.jpg');
INSERT INTO public.users VALUES (4, 'alesso@alesso.com', 'alesso', '$2b$10$f6mNgleHyk0vJ.kHeWOqRuKV0s1ETeNRaQRaXckSsaTKBihX3kiSi', 'Alessandro Lindenblad', 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Alesso_profile.png');
INSERT INTO public.users VALUES (5, 'flipturn@flipturn.com', 'flipturn', '$2b$10$ZV6qagC1jVFkC0oLr.8Ix.gfts1Sq.vzmE0ArL9jQOOgeebF/tcNS', 'Flipturn', 'https://atwoodmagazine.com/wp-content/uploads/2021/02/flipturn-1-1170x779.jpg');


--
-- Name: hashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hashtags_id_seq', 2, true);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.likes_id_seq', 22, true);


--
-- Name: postsHashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."postsHashtags_id_seq"', 2, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 11, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 22, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: hashtags hashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_pkey PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: postsHashtags postsHashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."postsHashtags"
    ADD CONSTRAINT "postsHashtags_pkey" PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: likes likes_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: likes likes_userIdLike_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_userIdLike_fkey" FOREIGN KEY ("userIdLike") REFERENCES public.users(id);


--
-- Name: postsHashtags postsHashtags_hashtagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."postsHashtags"
    ADD CONSTRAINT "postsHashtags_hashtagId_fkey" FOREIGN KEY ("hashtagId") REFERENCES public.hashtags(id);


--
-- Name: postsHashtags postsHashtags_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."postsHashtags"
    ADD CONSTRAINT "postsHashtags_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: posts posts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

