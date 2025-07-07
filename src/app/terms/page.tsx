// src/app/terms/page.tsx
'use client';

import PageLayout from '@/components/layout/PageLayout';
import { Shield, Calendar, FileText, Phone, Mail, Lock, Users, ExternalLink } from 'lucide-react';

export default function TermsPage() {
  return (
      <div className="min-h-screen py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Shield className="w-16 h-16 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Terms and Conditions
            </h1>
            <div className="flex items-center justify-center text-gray-400 text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              Last updated on June 25, 2025
            </div>
          </div>

          {/* Razorpay Terms Link */}
          <div className="mb-8 text-center">
            <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/30">
              <h3 className="text-lg font-semibold text-white mb-3">Official Terms & Conditions</h3>
              <p className="text-gray-300 mb-4">
                For the most up-to-date and legally binding terms and conditions, please visit our official Razorpay terms page.
              </p>
              <a 
                href="https://merchant.razorpay.com/policy/Q6ZFaYSG19DvEB/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                View Official Terms on Razorpay
              </a>
            </div>
          </div>

          {/* Content */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <div className="prose prose-invert max-w-none">
              
              {/* Introduction */}
              <div className="mb-8">
                <p className="text-gray-300 leading-relaxed">
                  For the purpose of these Terms and Conditions, the term "we", "us", "our" used anywhere on this page shall mean <strong className="text-white">HEMANTH RAJ C</strong>, whose registered/operational office is 3/133, Sourashtrapuram 5th Street, Vandiyur, Madurai - 625020 Madurai TAMIL NADU 625020. "you", "your", "user", "visitor" shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.
                </p>
              </div>

              <div className="mb-8">
                <p className="text-gray-300 leading-relaxed">
                  Your use of the website and/or purchase from us are governed by following Terms and Conditions:
                </p>
              </div>

              {/* Terms List */}
              <div className="space-y-6">
                <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                  <p className="text-gray-300 leading-relaxed">
                    The content of the pages of this website is subject to change without notice.
                  </p>
                </div>

                <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                  <p className="text-gray-300 leading-relaxed">
                    Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
                  </p>
                </div>

                <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                  <p className="text-gray-300 leading-relaxed">
                    Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements.
                  </p>
                </div>

                <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                  <p className="text-gray-300 leading-relaxed">
                    Our website contains material which is owned by or licensed to us. This material includes, but are not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
                  </p>
                </div>

                <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                  <p className="text-gray-300 leading-relaxed">
                    All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.
                  </p>
                </div>

                <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                  <p className="text-gray-300 leading-relaxed">
                    Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.
                  </p>
                </div>

                <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                  <p className="text-gray-300 leading-relaxed">
                    From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information.
                  </p>
                </div>

                <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                  <p className="text-gray-300 leading-relaxed">
                    You may not create a link to our website from another website or document without <strong className="text-white">HEMANTH RAJ C's</strong> prior written consent.
                  </p>
                </div>

                <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                  <p className="text-gray-300 leading-relaxed">
                    Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of <strong className="text-white">India</strong>.
                  </p>
                </div>

                <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                  <p className="text-gray-300 leading-relaxed">
                    We, shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.
                  </p>
                </div>
              </div>

              {/* Cancellation and Refunds Section */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-blue-400" />
                  Cancellation and Refunds
                </h2>
                <div className="text-sm text-gray-400 mb-6 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Last updated on June 25, 2025
                </div>

                <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30 mb-6">
                  <p className="text-gray-300 leading-relaxed">
                    <strong className="text-white">HEMANTH RAJ C</strong> believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                    <p className="text-gray-300 leading-relaxed">
                      Cancellations will be considered only if the request is made within <strong className="text-white">2 days</strong> of placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.
                    </p>
                  </div>

                  <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                    <p className="text-gray-300 leading-relaxed">
                      <strong className="text-white">HEMANTH RAJ C</strong> does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.
                    </p>
                  </div>

                  <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                    <p className="text-gray-300 leading-relaxed">
                      In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within <strong className="text-white">2 days</strong> of receipt of the products.
                    </p>
                  </div>

                  <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                    <p className="text-gray-300 leading-relaxed">
                      In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within <strong className="text-white">2 days</strong> of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.
                    </p>
                  </div>

                  <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                    <p className="text-gray-300 leading-relaxed">
                      In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.
                    </p>
                  </div>

                  <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                    <p className="text-gray-300 leading-relaxed">
                      In case of any Refunds approved by the <strong className="text-white">HEMANTH RAJ C</strong>, it'll take <strong className="text-white">2 days</strong> for the refund to be processed to the end customer.
                    </p>
                  </div>
                </div>
              </div>

              {/* Shipping and Delivery Section */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-green-400" />
                  Shipping Policy
                </h2>
                <div className="text-sm text-gray-400 mb-6 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Last updated on June 25, 2025
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                    <p className="text-gray-300 leading-relaxed">
                      For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only. For domestic buyers, orders are shipped through registered domestic courier companies and /or speed post only.
                    </p>
                  </div>

                  <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                    <p className="text-gray-300 leading-relaxed">
                      Orders are shipped within <strong className="text-white">0-7 days</strong> or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms.
                    </p>
                  </div>

                  <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                    <p className="text-gray-300 leading-relaxed">
                      <strong className="text-white">HEMANTH RAJ C</strong> is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within <strong className="text-white">0-7 days</strong> from the date of the order and payment or as per the delivery date agreed at the time of order confirmation.
                    </p>
                  </div>

                  <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                    <p className="text-gray-300 leading-relaxed">
                      Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration.
                    </p>
                  </div>
                </div>
              </div>

              {/* Privacy Policy Section */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
                  <Lock className="w-6 h-6 mr-3 text-purple-400" />
                  Privacy Policy
                </h2>
                <div className="text-sm text-gray-400 mb-6 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Last updated on June 25, 2025
                </div>

                <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-500/30 mb-6">
                  <p className="text-gray-300 leading-relaxed">
                    <strong className="text-white">HEMANTH RAJ C</strong> is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                    <h4 className="text-white font-semibold mb-3">Information We Collect</h4>
                    <p className="text-gray-300 leading-relaxed">
                      We collect information you provide directly to us, such as when you create an account, use our AI services, or contact us for support. This may include your name, email address, and conversation data necessary for providing our educational AI services.
                    </p>
                  </div>

                  <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                    <h4 className="text-white font-semibold mb-3">How We Use Your Information</h4>
                    <p className="text-gray-300 leading-relaxed">
                      We use your information to provide, maintain, and improve our AI educational services, personalize your learning experience, respond to your inquiries, and ensure the security of our platform.
                    </p>
                  </div>

                  <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                    <h4 className="text-white font-semibold mb-3">Data Security</h4>
                    <p className="text-gray-300 leading-relaxed">
                      We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. We use Firebase security features and follow industry best practices.
                    </p>
                  </div>

                  <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                    <h4 className="text-white font-semibold mb-3">Data Retention</h4>
                    <p className="text-gray-300 leading-relaxed">
                      We retain your personal information only for as long as necessary to provide our services and fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
                    </p>
                  </div>

                  <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                    <h4 className="text-white font-semibold mb-3">Your Rights</h4>
                    <p className="text-gray-300 leading-relaxed">
                      You have the right to access, update, or delete your personal information. You may also request data portability or object to certain processing activities. Contact us to exercise these rights.
                    </p>
                  </div>

                  <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                    <h4 className="text-white font-semibold mb-3">Cookies and Tracking</h4>
                    <p className="text-gray-300 leading-relaxed">
                      We use cookies and similar technologies to enhance your experience, remember your preferences, and analyze usage patterns. You can control cookie settings through your browser.
                    </p>
                  </div>

                  <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                    <h4 className="text-white font-semibold mb-3">Third-Party Services</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Our platform integrates with third-party services like Firebase, Google Colab, and HuggingFace. These services have their own privacy policies, and we encourage you to review them.
                    </p>
                  </div>

                  <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                    <h4 className="text-white font-semibold mb-3">Updates to Privacy Policy</h4>
                    <p className="text-gray-300 leading-relaxed">
                      We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last updated" date.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Us Section */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
                  <Users className="w-6 h-6 mr-3 text-orange-400" />
                  Contact Us
                </h2>

                <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-500/30 mb-6">
                  <p className="text-gray-300 leading-relaxed">
                    Have questions, concerns, or need support? We're here to help! Reach out to us through any of the following methods:
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                    <h4 className="text-white font-semibold mb-3">Business Information</h4>
                    <div className="space-y-2">
                      <p className="text-gray-300"><strong className="text-white">Business Name:</strong> HEMANTH RAJ C</p>
                      <p className="text-gray-300"><strong className="text-white">Address:</strong> 3/133, Sourashtrapuram 5th Street, Vandiyur, Madurai - 625020, Tamil Nadu, India</p>
                    </div>
                  </div>

                  <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                    <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-600/20 p-2 rounded-lg">
                          <Phone className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Phone</p>
                          <a href="tel:+919245435888" className="text-green-400 hover:text-green-300 transition-colors">
                            +91 9245435888
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-600/20 p-2 rounded-lg">
                          <Mail className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Email</p>
                          <a href="mailto:personalhemanthraj@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                            personalhemanthraj@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                    <h4 className="text-white font-semibold mb-3">Support Hours</h4>
                    <p className="text-gray-300 leading-relaxed">
                      We strive to respond to all inquiries within <strong className="text-white">24-48 hours</strong>. For urgent technical issues, please include detailed information about the problem you're experiencing.
                    </p>
                  </div>

                  <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/50">
                    <h4 className="text-white font-semibold mb-3">What to Include in Your Message</h4>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Your account email (if applicable)</li>
                      <li>• Detailed description of your issue or question</li>
                      <li>• Screenshots or error messages (if relevant)</li>
                      <li>• Your browser and device information (for technical issues)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
