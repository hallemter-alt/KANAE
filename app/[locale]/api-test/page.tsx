'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ApiTestPage() {
  const [helloResponse, setHelloResponse] = useState<any>(null);
  const [propertiesResponse, setPropertiesResponse] = useState<any>(null);
  const [contactResponse, setContactResponse] = useState<any>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const testHelloApi = async () => {
    setLoading('hello');
    try {
      const res = await fetch('/api/hello');
      const data = await res.json();
      setHelloResponse(data);
    } catch (error) {
      setHelloResponse({ error: String(error) });
    } finally {
      setLoading(null);
    }
  };

  const testPropertiesApi = async () => {
    setLoading('properties');
    try {
      const res = await fetch('/api/properties?type=rent&minPrice=50000&maxPrice=150000');
      const data = await res.json();
      setPropertiesResponse(data);
    } catch (error) {
      setPropertiesResponse({ error: String(error) });
    } finally {
      setLoading(null);
    }
  };

  const testContactApi = async () => {
    setLoading('contact');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'テストユーザー',
          email: 'test@example.com',
          phone: '090-1234-5678',
          message: 'これはテストメッセージです。',
          type: 'inquiry',
        }),
      });
      const data = await res.json();
      setContactResponse(data);
    } catch (error) {
      setContactResponse({ error: String(error) });
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">API Routes テスト</h1>
          
          <div className="space-y-8">
            {/* Hello API Test */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Hello API</h2>
              <p className="text-gray-600 mb-4">
                エンドポイント: <code className="bg-gray-100 px-2 py-1 rounded">GET /api/hello</code>
              </p>
              <button
                onClick={testHelloApi}
                disabled={loading === 'hello'}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                {loading === 'hello' ? 'テスト中...' : 'テスト実行'}
              </button>
              {helloResponse && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">レスポンス:</h3>
                  <pre className="text-sm text-gray-800 overflow-x-auto">
                    {JSON.stringify(helloResponse, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* Properties API Test */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Properties API</h2>
              <p className="text-gray-600 mb-4">
                エンドポイント: <code className="bg-gray-100 px-2 py-1 rounded">GET /api/properties</code>
              </p>
              <p className="text-sm text-gray-500 mb-4">
                クエリパラメータ: type=rent&minPrice=50000&maxPrice=150000
              </p>
              <button
                onClick={testPropertiesApi}
                disabled={loading === 'properties'}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
              >
                {loading === 'properties' ? 'テスト中...' : 'テスト実行'}
              </button>
              {propertiesResponse && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">レスポンス:</h3>
                  <pre className="text-sm text-gray-800 overflow-x-auto max-h-96">
                    {JSON.stringify(propertiesResponse, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* Contact API Test */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Contact API</h2>
              <p className="text-gray-600 mb-4">
                エンドポイント: <code className="bg-gray-100 px-2 py-1 rounded">POST /api/contact</code>
              </p>
              <div className="text-sm text-gray-500 mb-4">
                <p className="font-semibold mb-2">リクエストボディ:</p>
                <pre className="bg-gray-100 p-3 rounded overflow-x-auto">
{`{
  "name": "テストユーザー",
  "email": "test@example.com",
  "phone": "090-1234-5678",
  "message": "これはテストメッセージです。",
  "type": "inquiry"
}`}
                </pre>
              </div>
              <button
                onClick={testContactApi}
                disabled={loading === 'contact'}
                className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 disabled:bg-gray-400 transition-colors"
              >
                {loading === 'contact' ? 'テスト中...' : 'テスト実行'}
              </button>
              {contactResponse && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">レスポンス:</h3>
                  <pre className="text-sm text-gray-800 overflow-x-auto">
                    {JSON.stringify(contactResponse, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* API Documentation */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 API ドキュメント</h2>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">利用可能なエンドポイント:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><code>/api/hello</code> - シンプルなテストAPI</li>
                    <li><code>/api/properties</code> - 物件データの取得・作成</li>
                    <li><code>/api/contact</code> - お問い合わせフォーム送信</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-2">クエリパラメータ (Properties API):</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li><code>type</code> - 物件タイプ (rent または sale)</li>
                    <li><code>minPrice</code> - 最低価格</li>
                    <li><code>maxPrice</code> - 最高価格</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-2">サポートされるHTTPメソッド:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Hello API: GET</li>
                    <li>Properties API: GET, POST</li>
                    <li>Contact API: POST</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
