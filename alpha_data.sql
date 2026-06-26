--
-- PostgreSQL database dump
--

\restrict ts7agyxJfbI5CogSWd02wK9nr4zrZd2Eb5I0goMXJb7ajNUR1RJ4dusI2MT64En

-- Dumped from database version 16.13 (Debian 16.13-1.pgdg13+1)
-- Dumped by pg_dump version 16.13

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

--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Category" (id, name) FROM stdin;
dbe9ade6-7b42-4f24-8c7a-6338ec985a52	Diseñador
dbe9ade6-7b42-4f24-8c7a-6338ec985a53	Árabes
7a11c68c-68e4-4e55-8e9b-412fedea8f52	Decants
\.


--
-- Data for Name: Perfume; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Perfume" (id, name, designer, type, gender, description, "categoryId", "createdAt", "updatedAt", image, discount, price, "remainingMl", stock, rating, "reviewCount") FROM stdin;
2051b074-8d8b-4e02-81c8-46d497aec31b	Acqua di Gio	Giorgio Armani	DESIGNER	MALE	\N	dbe9ade6-7b42-4f24-8c7a-6338ec985a52	2026-06-22 19:08:42.993	2026-06-22 19:31:35.619	https://i.ibb.co/whcdvtQ8/mp-7368-bottle-2.png	0	100.00	100	1	5.00	100
\.


--
-- Data for Name: Decant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Decant" (id, ml, price, stock, "perfumeId", image) FROM stdin;
07555ca3-b2e5-4c00-ae45-7b0d530332f2	100	100.00	1	2051b074-8d8b-4e02-81c8-46d497aec31b	\N
\.


--
-- Data for Name: Feeling; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Feeling" (id, "perfumeId", love, "like", indifferent, dislike, hate) FROM stdin;
d9e01851-3981-4db3-a024-08aef16aea53	2051b074-8d8b-4e02-81c8-46d497aec31b	1	1	1	1	1
\.


--
-- Data for Name: Longevity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Longevity" (id, "perfumeId", scarce, weak, moderate, long, "veryLong") FROM stdin;
ef4578c8-e7f0-4a27-a7ac-c565998b291e	2051b074-8d8b-4e02-81c8-46d497aec31b	1	1	1	1	1
\.


--
-- Data for Name: Note; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Note" (id, "perfumeId", name, stage) FROM stdin;
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Review" (id, "perfumeId", "userName", comment, rating, "createdAt") FROM stdin;
\.


--
-- Data for Name: Season; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Season" (id, "perfumeId", winter, spring, summer, autumn, day, night) FROM stdin;
f716102a-e231-4ab4-be49-631ebad59c01	2051b074-8d8b-4e02-81c8-46d497aec31b	1	1	1	1	1	1
\.


--
-- Data for Name: Sillage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Sillage" (id, "perfumeId", soft, moderate, heavy, huge) FROM stdin;
6f68e891-2467-4aa2-a18d-a85c3c6f73bb	2051b074-8d8b-4e02-81c8-46d497aec31b	1	1	1	1
\.


--
-- Data for Name: Tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tag" (id, name, image) FROM stdin;
36a35c8b-cfd7-427e-93aa-e2ced503ff4f	Oficina	https://placehold.co/400x600
edbfc996-f22f-46fe-8d85-1682549df2ff	Día	https://placehold.co/400x600
388e8fb5-2d22-4c3d-b4b1-29168677c8c7	Invierno	https://placehold.co/400x600
5d98a6b6-c416-4c5d-9c30-e852f5b6467e	Verano	https://placehold.co/400x600
305fdc18-6ea9-4dcc-8db4-4972611f9138	Noche	https://placehold.co/400x600
\.


--
-- Data for Name: _Tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_Tags" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
1f45d1d4-0e08-4b95-976b-a77f2e197445	2987409c321c25eaa5160defc46923eae25d370f215aec3fbff530d39648afa6	2026-06-19 15:05:04.218519+00	20260619150504	\N	\N	2026-06-19 15:05:04.066042+00	1
4980cc9c-c30e-4d1b-b0ab-07294a31daaa	179646904165eb6ec59e007358f94691974d09e2d0939ad494aa6a1b1d65dd31	2026-06-22 18:55:48.951383+00	20260620200117	\N	\N	2026-06-22 18:55:48.87121+00	1
6f8066a8-e3ba-46a5-9104-311533dfe52c	a6b02f375933d6f2509357f99655a4f7307786c3407246cfe17cefdb76191be4	2026-06-22 18:55:50.563196+00	20260622185550	\N	\N	2026-06-22 18:55:50.554344+00	1
f030d86c-0e1b-47ab-8b86-7cbe86292888	aa320f88e5c51d1aa2ca6797794869b40db93781aee09fcf6956f9ccd9f575c1	2026-06-23 14:50:26.931868+00	20260623145026	\N	\N	2026-06-23 14:50:26.923885+00	1
27579e77-79ac-4300-b695-4765aa51e0ea	118e0bebb8337ed3cdd3f2787e1c2aa912b30d57bcdc90c507b05ee088e6a3b9	2026-06-23 18:51:45.732756+00	20260623185145	\N	\N	2026-06-23 18:51:45.689012+00	1
b84ebe22-e23c-4743-9609-00f2322871e1	074e8ce3837bad3f8cd766600961d953aa673675b1d201bb4e3c194d8b5dd89a	2026-06-23 18:55:10.325208+00	20260623185510	\N	\N	2026-06-23 18:55:10.287313+00	1
833ca4dc-6e51-4272-bba9-6ddec6c11edf	1cfc63b8e40eca94aa005d7aa2a181f78aeb1a7da2def861742fbccab9bf5bef	2026-06-23 19:15:21.900293+00	20260623191521	\N	\N	2026-06-23 19:15:21.853653+00	1
f14df4d4-2eb5-45d0-8a6e-989cc37800eb	6d9da3a20d0ae4ef76fdf3b57828d5874dd5631f6317f99741dba269aba277b7	2026-06-23 20:15:09.180561+00	20260623201509	\N	\N	2026-06-23 20:15:09.136709+00	1
a1ced715-ab97-4f7c-979b-d7ff4971664d	391e20309ad1a8096402e8d995fb78d371c80308f94dda63f9b6a87060849481	2026-06-24 15:36:47.811768+00	20260624153647	\N	\N	2026-06-24 15:36:47.750372+00	1
dab9175f-289a-4d97-99ae-7bab1e92195d	e5a15d4fd8814397cf4c6b4218e0daa9a89c87352cc275b94269fcea9e6ebd4a	2026-06-24 18:54:41.077899+00	20260624185441	\N	\N	2026-06-24 18:54:41.06061+00	1
bf7a2010-65a4-4c9a-b8c6-769ca3a430f3	42b563fb702d6301a4448c752657846d0d77a983e17550e69c4b25c79f459f2f	2026-06-26 18:47:17.749709+00	20260626184717_add_tags_relation	\N	\N	2026-06-26 18:47:17.67798+00	1
afdbe510-7cc5-4ab2-b0f2-a7fb27b63837	247577f5e7b00a3d81ae3ed72d6c3a31c104846aa65ca44a74cbc74a84f90c23	2026-06-26 19:22:33.280463+00	20260626192233	\N	\N	2026-06-26 19:22:33.231896+00	1
\.


--
-- PostgreSQL database dump complete
--

\unrestrict ts7agyxJfbI5CogSWd02wK9nr4zrZd2Eb5I0goMXJb7ajNUR1RJ4dusI2MT64En

