
create table tuser(
id bigint not null auto_increment,
username varchar(100) not null,
password varchar(255) not null,
name varchar(120) not null,
document varchar(20) null,
phone varchar(20) null,
address varchar(200) null,
role varchar(20) not null,/*CLIENTE,ADMIN*/
createdAt datetime not null,
primary key(id),
unique key uk_tuser_username(username)
) engine=innodb;

create table tcategory(
id bigint not null auto_increment,
name varchar(100) not null,
description varchar(300) null,
primary key(id)
) engine=innodb;

create table tproduct(
id bigint not null auto_increment,
idCategory bigint not null,
name varchar(150) not null,
description varchar(500) null,
specifications varchar(500) null,
price decimal(10,2) not null,
stock int not null default 0,
minStockAlert int not null default 5,
primary key(id),
foreign key(idCategory) references tcategory(id) on delete cascade on update cascade
) engine=innodb;

create table ttechnician(
id bigint not null auto_increment,
name varchar(120) not null,
document varchar(20) not null,
phone varchar(20) not null,
specialty varchar(80) null,
active tinyint(1) not null default 1,
primary key(id)
) engine=innodb;

create table tquote(
id bigint not null auto_increment,
idClient bigint not null,
total decimal(10,2) not null,
status varchar(20) not null,/*PENDIENTE,ACEPTADA,RECHAZADA*/
notes varchar(500) null,
createdAt datetime not null,
primary key(id),
foreign key(idClient) references tuser(id) on delete cascade on update cascade
) engine=innodb;

create table tquotedetail(
id bigint not null auto_increment,
idQuote bigint not null,
idProduct bigint not null,
quantity int not null,
unitPrice decimal(10,2) not null,
subtotal decimal(10,2) not null,
primary key(id),
foreign key(idQuote) references tquote(id) on delete cascade on update cascade,
foreign key(idProduct) references tproduct(id) on delete cascade on update cascade
) engine=innodb;

create table torder(
id bigint not null auto_increment,
idClient bigint not null,
idQuote bigint null,
total decimal(10,2) not null,
shippingAddress varchar(300) not null,
currentStatus varchar(30) not null,/*RECIBIDO,PREPARANDO_ALMACEN,LISTO_RECOJO*/
createdAt datetime not null,
primary key(id),
foreign key(idClient) references tuser(id) on delete cascade on update cascade,
foreign key(idQuote) references tquote(id) on delete set null on update cascade
) engine=innodb;

create table torderdetail(
id bigint not null auto_increment,
idOrder bigint not null,
idProduct bigint not null,
quantity int not null,
price decimal(10,2) not null,
subtotal decimal(10,2) not null,
primary key(id),
foreign key(idOrder) references torder(id) on delete cascade on update cascade,
foreign key(idProduct) references tproduct(id) on delete cascade on update cascade
) engine=innodb;

create table torderstatushistory(
id bigint not null auto_increment,
idOrder bigint not null,
status varchar(30) not null,
comment varchar(500) null,
updatedAt datetime not null,
primary key(id),
foreign key(idOrder) references torder(id) on delete cascade on update cascade
) engine=innodb;

create table tappointment(
id bigint not null auto_increment,
idClient bigint not null,
idTechnician bigint null,
serviceType varchar(30) not null,/*INSTALACION,SOPORTE,DIAGNOSTICO*/
appointmentDate date not null,
timeSlot varchar(10) not null,/*MANANA,TARDE*/
serviceAddress varchar(300) not null,
isAtEstablishment tinyint(1) not null default 0,
currentStatus varchar(30) not null,/*RECIBIDO,EN_DIAGNOSTICO,TECNICO_EN_RUTA,EN_PROGRESO,COMPLETADO*/
notes varchar(500) null,
createdAt datetime not null,
primary key(id),
unique key uk_tappointment_slot(idTechnician, appointmentDate, timeSlot),
foreign key(idClient) references tuser(id) on delete cascade on update cascade,
foreign key(idTechnician) references ttechnician(id) on delete set null on update cascade
) engine=innodb;

create table tappointmentstatushistory(
id bigint not null auto_increment,
idAppointment bigint not null,
status varchar(30) not null,
comment varchar(500) null,
updatedAt datetime not null,
primary key(id),
foreign key(idAppointment) references tappointment(id) on delete cascade on update cascade
) engine=innodb;

create table tappointmentfile(
id bigint not null auto_increment,
idAppointment bigint not null,
name varchar(2000) not null,
extension varchar(5) not null,
createdAt datetime not null,
primary key(id),
foreign key(idAppointment) references tappointment(id) on delete cascade on update cascade
) engine=innodb;

create table tcontract(
id bigint not null auto_increment,
idAppointment bigint not null,
fileName varchar(300) not null,
generatedAt datetime not null,
createdAt datetime not null,
primary key(id),
foreign key(idAppointment) references tappointment(id) on delete cascade on update cascade
) engine=innodb;

-- ─────────────────────────────────────────────────────────────────────────
-- Datos semilla
-- ─────────────────────────────────────────────────────────────────────────
-- password de ambos usuarios demo = "123456" (hash BCrypt)
insert into tuser (username, password, name, document, phone, address, role, createdAt) values
('admin@demo.com', '$2a$10$7EqJtq98hPqEX7fNZaFWoOeVIkD9AXOSToPZglvbGtqXFXfL/4KlG', 'Administrador TechSec', '99999999', '987000000', 'Av. Central 123, Lima', 'ADMIN', now()),
('cliente@demo.com', '$2a$10$7EqJtq98hPqEX7fNZaFWoOeVIkD9AXOSToPZglvbGtqXFXfL/4KlG', 'Juan Perez Cliente', '12345678', '987654321', 'Jr. Los Claveles 456, Lima', 'CLIENTE', now());

insert into tcategory (name, description) values
('Cámaras', 'Cámaras de seguridad y videovigilancia'),
('Equipos Eléctricos', 'Tableros, cables y materiales eléctricos'),
('Accesorios', 'DVR, discos duros y accesorios varios');

insert into tproduct (idCategory, name, description, specifications, price, stock, minStockAlert) values
(1, 'Cámara IP Hikvision 4MP', 'Cámara IP de exterior con visión nocturna.', '4MP · IP67 · IR 30m', 189.90, 14, 5),
(1, 'Cámara PTZ 360° Dahua', 'Cámara PTZ con rotación de 360°.', 'Zoom 25x · PTZ · IP66', 349.00, 3, 5),
(2, 'Tablero Eléctrico 12 Polos', 'Tablero de distribución monofásico.', '12 polos · 220V', 129.50, 8, 5),
(2, 'Cable THHN 2.5mm x 100m', 'Cable THHN calibre 2.5mm, rollo de 100m.', '2.5mm · 100m · 600V', 89.00, 2, 5),
(3, 'DVR 8 Canales 4K', 'Grabador digital de 8 canales.', '8CH · 4K · H.265', 259.00, 6, 5),
(3, 'Disco Duro Seagate 2TB', 'Disco duro para videovigilancia 24/7.', '2TB · SATA III', 119.00, 11, 5),
(2, 'UPS 1000VA Forza', 'UPS regulador de voltaje.', '1000VA · 600W', 199.00, 5, 5),
(3, 'Cerradura Inteligente WiFi', 'Cerradura con acceso remoto vía app.', 'WiFi · App móvil', 229.00, 9, 5);

insert into ttechnician (name, document, phone, specialty, active) values
('Carlos Quispe', '45612378', '987 654 321', 'Cámaras de seguridad', 1),
('Luis Mamani', '45612379', '987 654 322', 'Eléctrico', 1),
('Roberto Salas', '45612380', '987 654 323', 'Soporte técnico', 0);
