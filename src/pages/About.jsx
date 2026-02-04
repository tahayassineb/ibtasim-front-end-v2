import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Heart, Users, Award, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const About = () => {
  const { associationInfo, stats } = useApp();

  const values = [
    {
      icon: Heart,
      title: 'Solidarité',
      description: 'Nous croyons en la force de la communauté et de l\'entraide pour surmonter les difficultés.',
    },
    {
      icon: Target,
      title: 'Efficacité',
      description: '100% des dons sont utilisés pour les projets. Nos frais de fonctionnement sont couverts par des partenaires.',
    },
    {
      icon: Users,
      title: 'Transparence',
      description: 'Nous publions régulièrement des rapports d\'activité et sommes audités chaque année.',
    },
    {
      icon: Award,
      title: 'Engagement',
      description: 'Depuis 2018, nous accompagnons les enfants et familles avec un suivi personnalisé.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-[400px]">
        <img
          src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=1920"
          alt="Notre équipe"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <span className="text-secondary-400 font-medium mb-2 block">À propos de nous</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Association Espoir
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              {associationInfo.arabicName} - Ensemble pour un avenir meilleur
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Notre histoire</h2>
          </div>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="mb-6">
              Fondée en {associationInfo.foundedYear}, l'{associationInfo.name} est née d'une volonté simple mais profonde : 
              offrir un avenir meilleur aux enfants orphelins et aux familles en difficulté au Maroc.
            </p>
            <p className="mb-6">
              {associationInfo.mission}
            </p>
            <p>
              Au fil des années, nous avons accompagné plus de {stats.beneficiaries} bénéficiaires 
              à travers des projets d'éducation, de santé, et de développement communautaire. 
              Chaque réussite est le fruit d'un travail collectif et de la générosité de nos donateurs.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Nos valeurs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Info */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations légales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Numéro d'enregistrement</p>
                <p className="font-medium text-gray-900">{associationInfo.registrationNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Date de création</p>
                <p className="font-medium text-gray-900">{associationInfo.foundedYear}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Siège social</p>
                <p className="font-medium text-gray-900">{associationInfo.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Contact</p>
                <p className="font-medium text-gray-900">{associationInfo.email}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Rejoignez notre mission
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Chaque don compte. Ensemble, nous pouvons faire la différence.
          </p>
          <Link to="/projets" className="btn-secondary inline-block text-lg">
            Soutenez-nous
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
